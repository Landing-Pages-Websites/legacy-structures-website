insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'inventory-images',
  'inventory-images',
  true,
  15728640,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'authenticated inventory image uploads'
  ) then
    create policy "authenticated inventory image uploads"
    on storage.objects
    for insert
    to authenticated
    with check (bucket_id = 'inventory-images');
  end if;
end $$;
