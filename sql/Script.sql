create table product (
	id uuid primary key default uuid_generate_v4(),
	title text,
	description text,
	image text,
	price int
)

create table stock (
	id uuid primary key default uuid_generate_v4(),
	product_id uuid,
	count int,
	foreign key ("product_id") references "product" ("id")
	
)

drop table product;
drop table stock;

create extension if not exists "uuid-ossp";



insert into product (image, title, description, price) values
('https://comicvine.gamespot.com/a/uploads/scale_large/11/117763/2403520-ss16.png', 'The Silver Surfer', 'Mephisto has yet another plan to obtain the Silver Surfers soul. He disguises himself and walks among the humans. He now comes up with another plot.', 4 ),
('https://comicvine.gamespot.com/a/uploads/scale_large/0/4/46616-3824-55259-1-wonder-woman.jpg', 'Wonder Woman', 'Diana seeks out Superman in order to ask that he deal with her in case she ever gets out of control with her powers.', 10),
('https://comicvine.gamespot.com/a/uploads/scale_large/2/22773/584980-theboys01.jpg', 'The Boys', 'Englishman called Butcher meets Susan L. Rayner, the new director of CIA and tells her that he wants to be in charge of their anti-supe team, Rayner reluclantly agrees.', 11),
('https://comicvine.gamespot.com/a/uploads/scale_large/0/3125/3680604-hell3.jpg', 'Hellboy Batman crossover', 'Hellboy and Batman against nazis', 5),
('https://comicvine.gamespot.com/a/uploads/scale_large/5/58436/1127211-aaa_000.jpg', 'Hard Boiled', 'One of the works that helped cement Frank Millers reputation as one of the most innovative creators of the comic book industry! ', 3),
('https://comicvine.gamespot.com/a/uploads/scale_large/0/4/37283-4207-41743-1-sandman-the.jpg', 'The Sandman', 'Robert Cadling visits a renaissance fare with his girlfriend. He has a conversation with Death who tells her about Morpheus.', 2),
('https://comicvine.gamespot.com/a/uploads/scale_large/6/67663/2033012-50.jpg', 'Preacher', 'Jesse goes to Washington D.C. to talk to Spaceman about his fathers Medal of Honor.', 6),
('https://comicvine.gamespot.com/a/uploads/scale_small/10/108980/2260155-saga__1__2012_.jpg', 'Saga', 'Star Wars-style action collides with Game of Thrones-esque drama in this original sci-fi/fantasy epic for mature readers', 3)

insert into stock (product_id, count) values
('6daf2210-f804-4b33-a686-153c5288c957', 200),
('1f232081-1693-40c0-abdb-b28984346c87', 300),
('33d12dac-fee0-4cbf-9c8b-300ecea437fe', 500),
('11367f37-1f57-491a-9948-10883ceca213', 400),
('78a5c1ec-bfdd-49d2-9120-d78bc788eeee', 600),
('5149c227-060d-4af3-881e-7e7c1c23eb0d', 700),
('688ea11b-cc0a-4622-a25a-5c62dc5f304d', 100),
('6a45d8d2-7d84-4865-959c-f7ea6e71aa3c', 900)



