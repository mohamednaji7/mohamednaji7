-- select u.name, ft.sum, COALESCE(ft.count, 0) as count from users u 
-- left join (
--         select user_id, sum(amount) as sum, count(user_id) as count 
--         from transactions
--         group by (user_id)
--     ) ft
--     on ft.user_id = u.id
-- order by ft.sum desc
-- ;

select u.name,
sum(t.amount) as sum , 
count(t.id) as count
from       
        users u 
        left join transactions t
        on u.id = t.user_id
    group by u.id
order by sum desc
;