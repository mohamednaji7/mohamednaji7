select user_id, sum(amount) as balance  from transactions 
group by user_id
;