update public.inventory_items
set building_material = 'Metal'
where model_type = 'Metal Lofted Barn'
  and building_material is null;

update public.inventory_items
set model_type = case model_type
  when 'Metal Lofted Barn' then 'Lofted Barn'
  when 'Utility Dormer' then 'Shed Dormer'
  when 'Utility Gable Dormer' then 'Gable Dormer'
  when 'Side Dormer A Frame' then 'Side Gable A Frame'
  when 'Lofted Barn Playhouse' then 'Lofted Playhouse Cabin'
  else model_type
end
where model_type in (
  'Metal Lofted Barn',
  'Utility Dormer',
  'Utility Gable Dormer',
  'Side Dormer A Frame',
  'Lofted Barn Playhouse'
);

with parsed_prices as (
  select
    id,
    nullif(regexp_replace(cash_price, '[^0-9.]', '', 'g'), '')::numeric as price
  from public.inventory_items
)
update public.inventory_items as inventory
set rto_36 = to_char(prices.price / 21.6, 'FM$999,999,999,990.00') || ' +tax',
    rto_48 = to_char(prices.price / 25.44, 'FM$999,999,999,990.00') || ' +tax',
    cash_price = to_char(prices.price, 'FM$999,999,999,990.00') || ' +tax',
    updated_at = now()
from parsed_prices as prices
where inventory.id = prices.id
  and prices.price > 0;

with ranked_duplicates as (
  select
    id,
    row_number() over (
      partition by inventory_number
      order by created_at desc nulls last, updated_at desc nulls last, id desc
    ) as duplicate_rank
  from public.inventory_items
  where nullif(btrim(inventory_number), '') is not null
)
delete from public.inventory_items as inventory
using ranked_duplicates as duplicates
where inventory.id = duplicates.id
  and duplicates.duplicate_rank > 1;

create unique index if not exists inventory_items_inventory_number_unique
on public.inventory_items (inventory_number)
where nullif(btrim(inventory_number), '') is not null;
