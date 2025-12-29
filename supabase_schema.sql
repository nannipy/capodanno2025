-- Create the dishes table
-- Matches strict Typescript interface:
-- interface Dish {
--   id: string;
--   contributor: string;
--   title: string;
--   category: Category; (string enum)
--   dietary: DietaryInfo; (json object)
--   timestamp: number;
-- }

create table if not exists dishes (
  id uuid default gen_random_uuid() primary key,
  contributor text not null,
  title text not null,
  category text not null,
  dietary jsonb not null default '{"vegetarian": false, "vegan": false, "glutenFree": false}'::jsonb,
  timestamp bigint not null default (extract(epoch from now()) * 1000)
);

-- Enable Row Level Security (RLS)
alter table dishes enable row level security;

-- Create a policy that allows anyone to read and write (since there is no auth yet)
-- WARNING: This allows anyone with the URL/Key to modify data. 
-- For a private event this is usually acceptable, but consider adding auth later.
create policy "Public Access"
on dishes
for all
using (true)
with check (true);
