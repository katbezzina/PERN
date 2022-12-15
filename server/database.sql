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
    usersid SERIAL,
    FOREIGN KEY (usersid) REFERENCES users(id)
)

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
    usersid SERIAL,
    postid SERIAL,
    FOREIGN KEY (usersid) REFERENCES users(id),
    FOREIGN KEY (postid) REFERENCES user_posts(postid)
)


