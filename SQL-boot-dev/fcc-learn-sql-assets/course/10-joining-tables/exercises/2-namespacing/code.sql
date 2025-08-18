SELECT u.name, u.age, c.name as country_name 
FROM users u
INNER JOIN countries c on c.country_code = u.country_code
order by country_name
;