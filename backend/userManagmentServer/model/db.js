const follow_table = "create table follow_table(follower_id INT references user_info(user_id) on delete cascade,following_id int references user_info(user_id) on delete cascade)"

const like_table = "create table follow_table(follower_id INT references user_info(user_id) on delete cascade,following_id int references user_info(user_id) on delete cascade)"