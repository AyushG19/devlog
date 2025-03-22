const follow_table = `create table follow_table(
    follower_id INT references user_info(user_id) on delete cascade,
    following_id int references user_info(user_id) on delete cascade
);`

const likes_table = `create table likes_table(
    like_id serial primary key,
    message_id int references message_posts(message_id) on delete cascade,
    user_id int references user_credentials (user_id) on delete cascade,
    created_at timestampz default current_timestamp,
    unique (message_id,user_id)
);`

const message_posts = `CREATE TABLE message_posts (
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_credentials(user_id) ON DELETE CASCADE,
    username VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    like_count INTEGER DEFAULT 0 CHECK (like_count >= 0),
    comment_count INTEGER DEFAULT 0 CHECK (comment_count >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    media_url TEXT
);`