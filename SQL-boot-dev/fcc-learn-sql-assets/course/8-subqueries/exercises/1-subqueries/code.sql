select * from transactions 
where user_id = (
    select id from users
        where name='David'
)
;