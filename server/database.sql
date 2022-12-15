Elephant SQL

CREATE TABLE users (
    id SERIAL PRIMARY KEY UNIQUE,
    name VARCHAR(300) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(300) NOT NULL,
    username VARCHAR(300),
    avatar VARCHAR(500)
)

CREATE TABLE user_posts
(
    postid SERIAL PRIMARY KEY UNIQUE,
    title VARCHAR(300) NOT NULL,
    description VARCHAR(300) NOT NULL,
    price numeric(10,2) NOT NULL,
    postimage VARCHAR(500) NOT NULL,
    postcode integer NOT NULL,
    createdat date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usersid integer NOT NULL UNIQUE,
    FOREIGN KEY (usersid) REFERENCES users(id)
)

CORRECT VERSION

CREATE TABLE user_posts
(
    postid SERIAL PRIMARY KEY UNIQUE,
    title VARCHAR(300) NOT NULL,
    description VARCHAR(300) NOT NULL,
    price numeric(10,2) NOT NULL,
    postimage VARCHAR(500) NOT NULL,
    postcode integer NOT NULL,
    createdat date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usersid SERIAL,
    FOREIGN KEY (usersid) REFERENCES users(id)
)

CREATE TABLE comments (
    commentid SERIAL PRIMARY KEY UNIQUE,
    message VARCHAR(500) NOT NULL,
    messagecreatedat timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usersid integer NOT NULL UNIQUE,
    postid integer NOT NULL UNIQUE,
    FOREIGN KEY (usersid) REFERENCES user_posts(usersid),
    FOREIGN KEY (postid) REFERENCES user_posts(postid)
)

CORRECT VERSION

CREATE TABLE comments (
    commentid SERIAL PRIMARY KEY UNIQUE,
    message VARCHAR(500) NOT NULL,
    messagecreatedat timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usersid SERIAL,
    postid SERIAL,
    FOREIGN KEY (usersid) REFERENCES users(id),
    FOREIGN KEY (postid) REFERENCES user_posts(postid)
)

CREATE TABLE favourites (
    favouriteid SERIAL PRIMARY KEY UNIQUE,
    usersid integer NOT NULL UNIQUE,
    postid integer NOT NULL UNIQUE,
    FOREIGN KEY (usersid) REFERENCES users(id),
    FOREIGN KEY (postid) REFERENCES user_posts(postid)
)

CORRECT VERSION 

CREATE TABLE favourites (
    favouriteid SERIAL PRIMARY KEY UNIQUE,
    usersid SERIAL,
    postid SERIAL,
    FOREIGN KEY (usersid) REFERENCES users(id),
    FOREIGN KEY (postid) REFERENCES user_posts(postid)
)


//to alter foreign keys

ALTER TABLE  favourites
ADD usersid integer,
ADD postid integer,
ADD FOREIGN KEY (usersid) REFERENCES users(id),
ADD FOREIGN KEY (postid) REFERENCES user_posts(postid);

ALTER TABLE  comments
DROP usersid;

ALTER TABLE  comments
DROP postid;

ALTER TABLE  comments
ADD usersid integer,
ADD FOREIGN KEY (usersid) REFERENCES user_posts(usersid);
ADD postid integer,
ADD FOREIGN KEY (postid) REFERENCES user_posts(postid);


