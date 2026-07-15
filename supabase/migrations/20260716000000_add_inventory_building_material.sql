alter table public.inventory_items
add column if not exists building_material text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'inventory_items_building_material_check'
      and conrelid = 'public.inventory_items'::regclass
  ) then
    alter table public.inventory_items
    add constraint inventory_items_building_material_check
    check (
      building_material is null
      or building_material in ('Metal', 'Wood', 'Vinyl')
    );
  end if;
end $$;
