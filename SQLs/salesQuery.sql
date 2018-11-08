SELECT d.department_id AS 'Department ID', d.department_name AS 'Department Name', d.over_head_costs AS 'Overhead Costs', SUM(p.product_sales) AS 'Total Sales'
FROM departments AS d
LEFT JOIN products AS p
ON d.department_name = p.department_name
GROUP BY d.department_id