select count(*) 
    from transactions 
    where user_id=6 and was_successful=true
    ;