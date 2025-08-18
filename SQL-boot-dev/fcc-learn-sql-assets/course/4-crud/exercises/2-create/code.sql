-- ?
insert into users (id,
        name,
        age,
        country_code,
        username,
        password,
        is_admin)
    values(
        1, 'David', 34, 'US', 'DavidDev', 'insertPractice', false
    )
    ;
insert into users (id,name,age,country_code,username,password,is_admin)
    values(
        2, 'Samantha', 29, 'BR', 'Sammy93', 'addingRecords!', false
    )
    ;
-- TEST SUITE, DON'T TOUCH BELOW THIS LINE --

SELECT * FROM users;

