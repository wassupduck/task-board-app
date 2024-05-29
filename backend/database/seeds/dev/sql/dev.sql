insert into app_user(id, username, password_hash) values
--  ('9966e411-ea47-4211-a233-dc4c9263bb48', 'jono', 'password')
    ('9966e411-ea47-4211-a233-dc4c9263bb48', 'jono', '$argon2id$v=19$m=65536,t=3,p=4$Lca2J7RHmpUi+g23HR3EXA$E5cyTWiFaPK/PmAKo7ZS5a87rxaPy+a6voMYd7n4VPo');

insert into board(id, name, app_user_id) values
    ('19723ae7-7ef2-41fa-8386-56b0744ccde6', 'Platform Launch', '9966e411-ea47-4211-a233-dc4c9263bb48'),
    ('7670a0c3-ba61-4b9f-a12a-72ce53f1d1bc', 'Marketing Plan', '9966e411-ea47-4211-a233-dc4c9263bb48');

insert into board_column(id, name, position, board_id) values
    ('3ec8a0d5-3af3-431a-b210-850247c55957', 'Todo', 0, '19723ae7-7ef2-41fa-8386-56b0744ccde6'),
    ('83083195-3f3f-4160-a561-1a7059557015', 'Doing', 1, '19723ae7-7ef2-41fa-8386-56b0744ccde6'),
    ('b9af068e-d01c-47d4-94a9-618efbe0acec', 'Done', 2, '19723ae7-7ef2-41fa-8386-56b0744ccde6');

insert into task(id, title, board_column_id, position) values
    ('ed73a05e-de97-4a6a-807a-77ce735abf05', 'Build UI for onboarding flow', '3ec8a0d5-3af3-431a-b210-850247c55957', '9'),
    ('0a840fec-4201-46d3-9cb9-672cd3c170d0', 'Build UI for search', '3ec8a0d5-3af3-431a-b210-850247c55957', 'f'),
    ('87720ce8-1443-4d43-b42c-2775be7664f5', 'Build settings for UI', '3ec8a0d5-3af3-431a-b210-850247c55957', 'p'),
    ('2e9b5d04-e71f-4e75-9c2e-2b18c676532f', 'Design settings and search pages', '83083195-3f3f-4160-a561-1a7059557015', 'h'),
    ('1208f29f-c002-4712-9a99-7e02bcf948ee', 'Add account management endpoints', '83083195-3f3f-4160-a561-1a7059557015', 'a'),
    ('c6aa674a-23b6-4f36-b3bf-139d7b899b1a', 'Create paper prototypes and conduct 10 usability tests with potential customers', 'b9af068e-d01c-47d4-94a9-618efbe0acec', '4'),
    ('56e7f4b7-2014-493c-adc3-5814adc17b75', 'Review results of usability tests and iterate', 'b9af068e-d01c-47d4-94a9-618efbe0acec', 'y'),
    ('cdb85227-5cf8-4410-9fa7-c851d8c6ae1f', 'Create wireframe prototype', 'b9af068e-d01c-47d4-94a9-618efbe0acec', 'm'),
    ('6202a452-7d50-4671-8d5d-1de8cf8b26a1', 'Conduct 5 wireframe tests', 'b9af068e-d01c-47d4-94a9-618efbe0acec', 'b');

insert into subtask(id, title, completed, task_id) values
    ('5559a668-10ad-4e7d-a532-bb4702f8dd63', 'Create account tables', true, '1208f29f-c002-4712-9a99-7e02bcf948ee'),
    ('856ec7a9-f188-488c-a27d-25d560b1e2d0', 'Create endpoints', false, '1208f29f-c002-4712-9a99-7e02bcf948ee'),
    ('775455f0-de06-4166-ac9d-246e669e277e', 'Testing', false, '1208f29f-c002-4712-9a99-7e02bcf948ee');
