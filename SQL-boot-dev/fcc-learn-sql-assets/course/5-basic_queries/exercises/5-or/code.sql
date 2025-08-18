select count(*)  from users 
    where age < 18 and  ( country_code='CA' or  country_code='US')
    ;