export default {
  boards: [
    {
      // name: 'Platform Launch',
      name: 'Kanban App (Demo)',
      columns: [
        {
          name: 'Todo',
          tasks: [
            {
              title: 'Build UI for onboarding flow',
              description: '',
              subtasks: [
                {
                  title: 'Sign up page',
                  completed: true,
                },
                {
                  title: 'Sign in page',
                  completed: false,
                },
                {
                  title: 'Welcome page',
                  completed: false,
                },
              ],
            },
            {
              title: 'Build UI for search',
              description: '',
              subtasks: [
                {
                  title: 'Search page',
                  completed: false,
                },
              ],
            },
            {
              title: 'Build settings UI',
              description: '',
              subtasks: [
                {
                  title: 'Account page',
                  completed: false,
                },
                {
                  title: 'Billing page',
                  completed: false,
                },
              ],
            },
            {
              title: 'QA and test all major user journeys',
              description:
                'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
              subtasks: [
                {
                  title: 'Internal testing',
                  completed: false,
                },
                {
                  title: 'External testing',
                  completed: false,
                },
              ],
            },
          ],
        },
        {
          name: 'Doing',
          tasks: [
            {
              title: 'Design settings and search pages',
              description: '',
              subtasks: [
                {
                  title: 'Settings - Account page',
                  completed: true,
                },
                {
                  title: 'Settings - Billing page',
                  completed: true,
                },
                {
                  title: 'Search page',
                  completed: false,
                },
              ],
            },
            {
              title: 'Add account management endpoints',
              description: '',
              subtasks: [
                {
                  title: 'Upgrade plan',
                  completed: true,
                },
                {
                  title: 'Cancel plan',
                  completed: true,
                },
                {
                  title: 'Update payment method',
                  completed: false,
                },
              ],
            },
            {
              title: 'Design onboarding flow',
              description: '',
              subtasks: [
                {
                  title: 'Sign up page',
                  completed: true,
                },
                {
                  title: 'Sign in page',
                  completed: false,
                },
                {
                  title: 'Welcome page',
                  completed: false,
                },
              ],
            },
            {
              title: 'Add search enpoints',
              description: '',
              subtasks: [
                {
                  title: 'Add search endpoint',
                  completed: true,
                },
                {
                  title: 'Define search filters',
                  completed: false,
                },
              ],
            },
            {
              title: 'Add authentication endpoints',
              description: '',
              subtasks: [
                {
                  title: 'Define user model',
                  completed: true,
                },
                {
                  title: 'Add auth endpoints',
                  completed: false,
                },
              ],
            },
            {
              title:
                'Research pricing points of various competitors and trial different business models',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              subtasks: [
                {
                  title: 'Research competitor pricing and business models',
                  completed: true,
                },
                {
                  title: 'Outline a business model that works for our solution',
                  completed: false,
                },
                {
                  title:
                    'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                  completed: false,
                },
              ],
            },
          ],
        },
        {
          name: 'Done',
          tasks: [
            {
              title: 'Conduct 5 wireframe tests',
              description:
                'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
              subtasks: [
                {
                  title: 'Complete 5 wireframe prototype tests',
                  completed: true,
                },
              ],
            },
            {
              title: 'Create wireframe prototype',
              description:
                'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
              subtasks: [
                {
                  title: 'Create clickable wireframe prototype in Balsamiq',
                  completed: true,
                },
              ],
            },
            {
              title: 'Review results of usability tests and iterate',
              description:
                "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              subtasks: [
                {
                  title:
                    'Meet to review notes from previous tests and plan changes',
                  completed: true,
                },
                {
                  title: 'Make changes to paper prototypes',
                  completed: true,
                },
                {
                  title: 'Conduct 5 usability tests',
                  completed: true,
                },
              ],
            },
            {
              title:
                'Create paper prototypes and conduct 10 usability tests with potential customers',
              description: '',
              subtasks: [
                {
                  title: 'Create paper prototypes for version one',
                  completed: true,
                },
                {
                  title: 'Complete 10 usability tests',
                  completed: true,
                },
              ],
            },
            {
              title: 'Market discovery',
              description:
                'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
              subtasks: [
                {
                  title: 'Interview 10 prospective customers',
                  completed: true,
                },
              ],
            },
            {
              title: 'Competitor analysis',
              description: '',
              subtasks: [
                {
                  title: 'Find direct and indirect competitors',
                  completed: true,
                },
                {
                  title: 'SWOT analysis for each competitor',
                  completed: true,
                },
              ],
            },
            {
              title: 'Research the market',
              description:
                'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
              subtasks: [
                {
                  title: 'Write up research analysis',
                  completed: true,
                },
                {
                  title: 'Calculate TAM',
                  completed: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Start Here',
      columns: [
        {
          name: 'Todo',
          tasks: [
            {
              title: 'Create a new board',
              description: 'Create a new board with two or more columns.',
              subtasks: [
                {
                  title: 'Create board',
                  completed: false,
                },
                {
                  title: 'Add two or more columns',
                  completed: false,
                },
              ],
            },
            {
              title: 'Create a task',
              description: 'Create a new task with some subtasks.',
              subtasks: [],
            },
            {
              title: 'Move a task',
              description:
                "Move a task by editing it's status or dragging it to a different column.",
              subtasks: [],
            },
          ],
        },
        {
          name: 'Doing',
          tasks: [],
        },
        {
          name: 'Done',
          tasks: [],
        },
      ],
    },
    // {
    //   "name": "Marketing Plan",
    //   "columns": [
    //     {
    //       "name": "Todo",
    //       "tasks": [
    //         {
    //           "title": "Plan Product Hunt launch",
    //           "description": "",
    //           "subtasks": [
    //             {
    //               "title": "Find hunter",
    //               "completed": false
    //             },
    //             {
    //               "title": "Gather assets",
    //               "completed": false
    //             },
    //             {
    //               "title": "Draft product page",
    //               "completed": false
    //             },
    //             {
    //               "title": "Notify customers",
    //               "completed": false
    //             },
    //             {
    //               "title": "Notify network",
    //               "completed": false
    //             },
    //             {
    //               "title": "Launch!",
    //               "completed": false
    //             }
    //           ]
    //         },
    //         {
    //           "title": "Share on Show HN",
    //           "description": "",
    //           "subtasks": [
    //             {
    //               "title": "Draft out HN post",
    //               "completed": false
    //             },
    //             {
    //               "title": "Get feedback and refine",
    //               "completed": false
    //             },
    //             {
    //               "title": "Publish post",
    //               "completed": false
    //             }
    //           ]
    //         },
    //         {
    //           "title": "Write launch article to publish on multiple channels",
    //           "description": "",
    //           "subtasks": [
    //             {
    //               "title": "Write article",
    //               "completed": false
    //             },
    //             {
    //               "title": "Publish on LinkedIn",
    //               "completed": false
    //             },
    //             {
    //               "title": "Publish on Inndie Hackers",
    //               "completed": false
    //             },
    //             {
    //               "title": "Publish on Medium",
    //               "completed": false
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "name": "Doing",
    //       "tasks": []
    //     },
    //     {
    //       "name": "Done",
    //       "tasks": []
    //     }
    //   ]
    // },
    // {
    //   "name": "Roadmap",
    //   "columns": [
    //     {
    //       "name": "Now",
    //       "tasks": [
    //         {
    //           "title": "Launch version one",
    //           "description": "",
    //           "subtasks": [
    //             {
    //               "title": "Launch privately to our waitlist",
    //               "completed": false
    //             },
    //             {
    //               "title": "Launch publicly on PH, HN, etc.",
    //               "completed": false
    //             }
    //           ]
    //         },
    //         {
    //           "title": "Review early feedback and plan next steps for roadmap",
    //           "description": "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
    //           "subtasks": [
    //             {
    //               "title": "Interview 10 customers",
    //               "completed": false
    //             },
    //             {
    //               "title": "Review common customer pain points and suggestions",
    //               "completed": false
    //             },
    //             {
    //               "title": "Outline next steps for our roadmap",
    //               "completed": false
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       "name": "Next",
    //       "tasks": []
    //     },
    //     {
    //       "name": "Later",
    //       "tasks": []
    //     }
    //   ]
    // }
  ],
};
