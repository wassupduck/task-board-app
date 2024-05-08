insert into app_user(username, password_hash) values
--  ('jono', 'password')
    ('jono', '$argon2id$v=19$m=65536,t=3,p=4$Lca2J7RHmpUi+g23HR3EXA$E5cyTWiFaPK/PmAKo7ZS5a87rxaPy+a6voMYd7n4VPo');

insert into board(name, app_user_id) values
    ('Platform Launch', 1),
    ('Marketing Plan', 1),
    ('Roadmap', 1);

insert into board_column(name, position, board_id) values
    ('Todo', 0, 1),
    ('Doing', 1, 1),
    ('Done', 2, 1);

insert into task(title, board_column_id) values
    ('Build UI for onboarding flow', 1),
    ('Build UI for search', 1),
    ('Build settings for UI', 1),
    ('Design settings and search pages', 2),
    ('Add account management endpoints', 2),
    ('Create paper prototypes and conduct 10 usability tests with potential customers', 3),
    ('Review results of usability tests and iterate', 3),
    ('Create wireframe prototype', 3),
    ('Conduct 5 wireframe tests', 3);

insert into subtask(title, completed, task_id) values
    ('Create account tables', true, 5),
    ('Create endpoints', false, 5),
    ('Testing', false, 5);
