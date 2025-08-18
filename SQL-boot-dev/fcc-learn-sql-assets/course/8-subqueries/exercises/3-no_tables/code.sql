select * from users
    where age_in_days >= (
        select 365*40
    )
;