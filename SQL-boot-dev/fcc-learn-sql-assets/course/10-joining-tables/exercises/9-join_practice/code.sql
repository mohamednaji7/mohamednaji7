-- select 
-- u.id, u.name, u.age, u.username, c.name as country_name,
-- sum(t.amount) as balance
-- from
--             users u
--             join countries c
--             on u.country_code = c.country_code
--             left join transactions t
--             on u.id = t.user_id
--         group by u.id
--     having u.id =6
-- ; 

-- select 
-- u.id, u.name, u.age, u.username, c.name as country_name,
-- sum(t.amount) as balance
-- from
--         users u
--         join countries c
--         on u.country_code = c.country_code
--         left join transactions t
--         on u.id = t.user_id
--     where u.id =6
-- ; 

select 
u.id, u.name, u.age, u.username, c.name as country_name,
sum(t.amount) as balance
from
        (select * from 
                    users 
                where users.id =6
        ) u

        join countries c
        on u.country_code = c.country_code

        left join (select * from 
                transactions
            where transactions.user_id=6
        ) t
        on u.id = t.user_id
    
; 
