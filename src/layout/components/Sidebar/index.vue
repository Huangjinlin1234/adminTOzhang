<template>
  <div class="sibar-container">
    <div class="search-content">
      <el-row type="flex" justify="space-between">
        <el-col :span="19">
          <el-input v-model="input" placeholder="搜索快捷菜单..." prefix-icon="el-icon-search" />
        </el-col>
        <el-col :span="5">
          <div class="icont-menu">
            <i class="el-icon-menu" />
          </div>
        </el-col>
      </el-row>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.scss';

export default {
  components: { SidebarItem },
  data () {
    return {
      input: '',
      permission_routes: [
        {
          'path': '/redirect',
          'hidden': true,
          'children': [
            {
              'path': '/redirect/:path(.*)'
            }
          ]
        },
        {
          'path': '/login',
          'hidden': true
        },
        {
          'path': '/auth-redirect',
          'hidden': true
        },
        {
          'path': '/404',
          'hidden': true
        },
        {
          'path': '/401',
          'hidden': true
        },
        {
          'path': '/',
          'redirect': '/dashboard',
          'children': [
            {
              'path': 'dashboard',
              'name': 'Dashboard',
              'meta': {
                'title': '首页',
                'icon': 'dashboard',
                'affix': true
              }
            }
          ]
        },
        {
          'path': '/system',
          'redirect': '/system/user',
          'alwaysShow': true,
          'name': 'System',
          'meta': {
            'title': '系统管理',
            'icon': 'documentation',
            'affix': true
          },
          'children': [
            {
              'path': 'user',
              'meta': {
                'title': '用户管理'
              },
              'name': 'user',
              'children': []
            },
            {
              'path': 'org',
              'meta': {
                'title': '机构管理',
                'affix': true
              },
              'name': 'org',
              'children': []
            },
            {
              'path': 'role',
              'meta': {
                'title': '角色管理'
              },
              'name': 'role',
              'children': []
            },
            {
              'path': 'dataroot',
              'meta': {
                'title': '数据权限'
              },
              'name': 'dataroot',
              'children': []
            },
            {
              'path': 'dutyPage',
              'meta': {
                'title': '岗位管理'
              },
              'name': 'dutyPage',
              'children': []
            },
            {
              'path': '/system',
              'redirect': '/system/define',
              'meta': {
                'title': '资源管理'
              },
              'name': 'resource',
              'children': [
                {
                  'path': 'define',
                  'meta': {
                    'title': '资源定义'
                  },
                  'name': 'define',
                  'children': []

                },
                {
                  'path': 'rescroot',
                  'meta': {
                    'title': '资源权限'
                  },
                  'name': 'rescroot',
                  'children': []
                },
                {
                  'path': 'reporoot',
                  'meta': {
                    'title': '报表权限管理'
                  },
                  'name': 'reporoot',
                  'children': []
                }
              ]
            },
            {
              'path': '/system',
              'redirect': '/system/muban1',
              'meta': {
                'title': '资源管理'
              },
              'name': 'muban',
              'children': [
                {
                  'path': "muban1",
                  'meta': { 'title': "muban1" },
                  'name': "muban1",
                  'children': []
                },
                {
                  'path': "muban2",
                  'meta': { 'title': "muban2" },
                  'name': "muban2",
                  'children': []
                },
                {
                  'path': "muban3",
                  'meta': { 'title': "muban3" },
                  'name': "muban3",
                  'children': []
                },
              ]
            },
          ]
        },

        {
          'path': '/template',
          'component': {
            'name': 'Layout',
            'components': {
              'AppMain': {
                'name': 'AppMain',
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-078753dd',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/AppMain.vue',
                '_Ctor': {}
              },
              'Navbar': {
                'components': {
                  'Breadcrumb': {
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-b50ef614',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Breadcrumb/index.vue'
                  },
                  'Hamburger': {
                    'name': 'Hamburger',
                    'props': {
                      'isActive': {
                        'default': false
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-4e6f274c',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Hamburger/index.vue'
                  },
                  'ErrorLog': {
                    'name': 'ErrorLog',
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-cf51e862',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ErrorLog/index.vue'
                  },
                  'Screenfull': {
                    'name': 'Screenfull',
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-29234bee',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/components/Screenfull/index.vue'
                  },
                  'SizeSelect': {
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/SizeSelect/index.vue'
                  },
                  'Search': {
                    'name': 'HeaderSearch',
                    'computed': {},
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-032bd1f0',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/HeaderSearch/index.vue'
                  }
                },
                'computed': {},
                'methods': {},
                'staticRenderFns': [
                  null
                ],
                '_compiled': true,
                '_scopeId': 'data-v-d16d6306',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Navbar.vue',
                '_Ctor': {}
              },
              'RightPanel': {
                'name': 'RightPanel',
                'props': {
                  'clickNotClose': {
                    'default': false
                  },
                  'buttonTop': {
                    'default': 250
                  }
                },
                'computed': {},
                'watch': {},
                'beforeDestroy': [
                  null,
                  null
                ],
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-1e488bfb',
                'beforeCreate': [
                  null
                ],
                '__file': 'src/components/RightPanel/index.vue'
              },
              'Settings': {
                'components': {
                  'ThemePicker': {
                    'computed': {},
                    'watch': {
                      'defaultTheme': {
                        'immediate': true
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ThemePicker/index.vue'
                  }
                },
                'computed': {
                  'fixedHeader': {},
                  'tagsView': {},
                  'sidebarLogo': {}
                },
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-126b135a',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Settings/index.vue'
              },
              'Sidebar': {
                'components': {
                  'SidebarItem': {
                    'name': 'SidebarItem',
                    'components': {
                      'Item': {
                        'name': 'MenuItem',
                        'functional': true,
                        'props': {
                          'icon': {
                            'default': ''
                          },
                          'title': {
                            'default': ''
                          }
                        },
                        '_scopeId': 'data-v-31ea41b3',
                        '__file': 'src/layout/components/Sidebar/Item.vue'
                      },
                      'AppLink': {
                        'props': {
                          'to': {
                            'required': true
                          }
                        },
                        'computed': {},
                        'methods': {},
                        'staticRenderFns': [],
                        '_compiled': true,
                        'beforeCreate': [
                          null
                        ],
                        'beforeDestroy': [
                          null
                        ],
                        '__file': 'src/layout/components/Sidebar/Link.vue'
                      }
                    },
                    'mixins': [
                      {
                        'computed': {},
                        'methods': {}
                      }
                    ],
                    'props': {
                      'item': {
                        'required': true
                      },
                      'isNest': {
                        'default': false
                      },
                      'basePath': {
                        'default': ''
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-2d2bbdc2',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/layout/components/Sidebar/SidebarItem.vue'
                  }
                },
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-33ec43fc',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Sidebar/index.vue',
                '_Ctor': {}
              },
              'TagsView': {
                'components': {
                  'ScrollPane': {
                    'name': 'ScrollPane',
                    'computed': {},
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-be6b7bae',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/layout/components/TagsView/ScrollPane.vue'
                  }
                },
                'computed': {},
                'watch': {},
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-fac8ca64',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/TagsView/index.vue',
                '_Ctor': {}
              }
            },
            'mixins': [
              {
                'watch': {},
                'methods': {}
              }
            ],
            'computed': {},
            'methods': {},
            'staticRenderFns': [],
            '_compiled': true,
            '_scopeId': 'data-v-13877386',
            'beforeCreate': [
              null
            ],
            'beforeDestroy': [
              null
            ],
            '__file': 'src/layout/index.vue',
            '_Ctor': {}
          },
          'alwaysShow': true,
          'name': 'template',
          'meta': { 'title': '模板', 'icon': 'documentation', 'affix': true },
          'children': [
            {
              'path': 'first',
              'meta': { 'title': '模板一' },
              'name': 'first'
            },
            {
              'path': 'second',
              'meta': { 'title': '模板二' },
              'name': 'second'
            },
            {
              'path': 'third',
              'meta': { 'title': '模板三' },
              'name': 'third'
            },
            {
              'path': 'four',
              'meta': { 'title': '模板四' },
              'name': 'four'
            },
            // {
            //   'path': 'ninth',
            //   'meta': { 'title': '征信授权管理' },
            //   'name': 'ninth'
            // },
            // {
            //   'path': 'tenth',
            //   'meta': { 'title': '征信查询管理' },
            //   'name': 'tenth'
            // },
            // {
            //   'path': 'twlth',
            //   'meta': { 'title': '征信查询台账' },
            //   'name': 'twlth'
            // },
            // {
            //   'path': 'thirtyth',
            //   'meta': { 'title': '业务流程中发起征信查询' },
            //   'name': 'thirtyth'
            // }
            // {
            //   'path': 'fourteenth',
            //   'meta': { 'title': '押品信息管理' },
            //   'name': 'fourteenth'
            // },
          ]
        },
        {
          'path': '/documentation',
          'children': [
            {
              'path': 'index',
              'name': 'Documentation',
              'meta': {
                'title': 'Documentation',
                'icon': 'documentation',
                'affix': true
              }
            }
          ]
        },
        {
          'path': '/guide',
          'redirect': '/guide/index',
          'children': [
            {
              'path': 'index',
              'name': 'Guide',
              'meta': {
                'title': 'Guide',
                'icon': 'guide',
                'noCache': true
              }
            }
          ]
        },
        {
          'path': '/profile',
          'redirect': '/profile/index',
          'hidden': true,
          'children': [
            {
              'path': 'index',
              'name': 'Profile',
              'meta': {
                'title': 'Profile',
                'icon': 'user',
                'noCache': true
              }
            }
          ]
        },
        {
          'path': '/permission',
          'redirect': '/permission/page',
          'alwaysShow': true,
          'name': 'Permission',
          'meta': {
            'title': 'Permission2',
            'icon': 'lock',
            'roles': [
              'admin',
              'editor'
            ]
          },
          'children': [
            {
              'path': 'page',
              'name': 'PagePermission',
              'meta': {
                'title': 'Page Permission',
                'roles': [
                  'admin'
                ]
              }
            },
            {
              'path': 'directive',
              'name': 'DirectivePermission',
              'meta': {
                'title': 'Directive Permission'
              }
            },
            {
              'path': 'role',
              'name': 'RolePermission',
              'meta': {
                'title': 'Role Permission',
                'roles': [
                  'admin'
                ]
              }
            }
          ]
        },
        {
          'path': '/icon',
          'children': [
            {
              'path': 'index',
              'name': 'Icons',
              'meta': {
                'title': 'Icons',
                'icon': 'icon',
                'noCache': true
              }
            }
          ]
        },
        {
          'path': '/components',
          'component': {
            'name': 'Layout'
          },
          'redirect': 'noRedirect',
          'name': 'ComponentDemo',
          'meta': {
            'title': 'Components',
            'icon': 'component'
          },
          'children': [
            {
              'path': 'tinymce',
              'name': 'TinymceDemo',
              'meta': {
                'title': 'Tinymce'
              }
            },
            {
              'path': 'markdown',
              'name': 'MarkdownDemo',
              'meta': {
                'title': 'Markdown'
              }
            },
            {
              'path': 'json-editor',
              'name': 'JsonEditorDemo',
              'meta': {
                'title': 'JSON Editor'
              }
            },
            {
              'path': 'split-pane',
              'name': 'SplitpaneDemo',
              'meta': {
                'title': 'SplitPane'
              }
            },
            {
              'path': 'avatar-upload',
              'name': 'AvatarUploadDemo',
              'meta': {
                'title': 'Upload'
              }
            },
            {
              'path': 'dropzone',
              'name': 'DropzoneDemo',
              'meta': {
                'title': 'Dropzone'
              }
            },
            {
              'path': 'sticky',
              'name': 'StickyDemo',
              'meta': {
                'title': 'Sticky'
              }
            },
            {
              'path': 'count-to',
              'name': 'CountToDemo',
              'meta': {
                'title': 'Count To'
              }
            },
            {
              'path': 'mixin',
              'name': 'ComponentMixinDemo',
              'meta': {
                'title': 'Component Mixin'
              }
            },
            {
              'path': 'back-to-top',
              'name': 'BackToTopDemo',
              'meta': {
                'title': 'Back To Top'
              }
            },
            {
              'path': 'drag-dialog',
              'name': 'DragDialogDemo',
              'meta': {
                'title': 'Drag Dialog'
              }
            },
            {
              'path': 'drag-select',
              'name': 'DragSelectDemo',
              'meta': {
                'title': 'Drag Select'
              }
            },
            {
              'path': 'dnd-list',
              'name': 'DndListDemo',
              'meta': {
                'title': 'Dnd List'
              }
            },
            {
              'path': 'drag-kanban',
              'name': 'DragKanbanDemo',
              'meta': {
                'title': 'Drag Kanban'
              }
            }
          ]
        },
        {
          'path': '/charts',
          'redirect': 'noRedirect',
          'name': 'Charts',
          'meta': {
            'title': 'Charts',
            'icon': 'chart'
          },
          'children': [
            {
              'path': 'keyboard',
              'name': 'KeyboardChart',
              'meta': {
                'title': 'Keyboard Chart',
                'noCache': true
              }
            },
            {
              'path': 'line',
              'name': 'LineChart',
              'meta': {
                'title': 'Line Chart',
                'noCache': true
              }
            },
            {
              'path': 'mix-chart',
              'name': 'MixChart',
              'meta': {
                'title': 'Mix Chart',
                'noCache': true
              }
            }
          ]
        },
        {
          'path': '/nested',
          'redirect': '/nested/menu1/menu1-1',
          'name': 'Nested',
          'meta': {
            'title': 'Nested Routes',
            'icon': 'nested'
          },
          'children': [
            {
              'path': 'menu1',
              'name': 'Menu1',
              'meta': {
                'title': 'Menu 1'
              },
              'redirect': '/nested/menu1/menu1-1',
              'children': [
                {
                  'path': 'menu1-1',
                  'name': 'Menu1-1',
                  'meta': {
                    'title': 'Menu 1-1'
                  }
                },
                {
                  'path': 'menu1-2',
                  'name': 'Menu1-2',
                  'redirect': '/nested/menu1/menu1-2/menu1-2-1',
                  'meta': {
                    'title': 'Menu 1-2'
                  },
                  'children': [
                    {
                      'path': 'menu1-2-1',
                      'name': 'Menu1-2-1',
                      'meta': {
                        'title': 'Menu 1-2-1'
                      }
                    },
                    {
                      'path': 'menu1-2-2',
                      'name': 'Menu1-2-2',
                      'meta': {
                        'title': 'Menu 1-2-2'
                      }
                    }
                  ]
                },
                {
                  'path': 'menu1-3',
                  'name': 'Menu1-3',
                  'meta': {
                    'title': 'Menu 1-3'
                  }
                }
              ]
            },
            {
              'path': 'menu2',
              'name': 'Menu2',
              'meta': {
                'title': 'Menu 2'
              }
            }
          ]
        },
        {
          'path': '/table',
          'redirect': '/table/complex-table',
          'name': 'Table',
          'meta': {
            'title': 'Table',
            'icon': 'table'
          },
          'children': [
            {
              'path': 'dynamic-table',
              'name': 'DynamicTable',
              'meta': {
                'title': 'Dynamic Table'
              }
            },
            {
              'path': 'drag-table',
              'name': 'DragTable',
              'meta': {
                'title': 'Drag Table'
              }
            },
            {
              'path': 'inline-edit-table',
              'name': 'InlineEditTable',
              'meta': {
                'title': 'Inline Edit'
              }
            },
            {
              'path': 'complex-table',
              'name': 'ComplexTable',
              'meta': {
                'title': 'Complex Table'
              }
            }
          ]
        },
        {
          'path': '/example',
          'redirect': '/example/list',
          'name': 'Example',
          'meta': {
            'title': 'Example',
            'icon': 'el-icon-s-help'
          },
          'children': [
            {
              'path': 'create',
              'name': 'CreateArticle',
              'meta': {
                'title': 'Create Article',
                'icon': 'edit'
              }
            },
            {
              'path': 'edit/:id(\\d+)',
              'name': 'EditArticle',
              'meta': {
                'title': 'Edit Article',
                'noCache': true,
                'activeMenu': '/example/list'
              },
              'hidden': true
            },
            {
              'path': 'list',
              'name': 'ArticleList',
              'meta': {
                'title': 'Article List',
                'icon': 'list'
              }
            }
          ]
        },
        {
          'path': '/tab',
          'component': {
            'name': 'Layout',
            'components': {
              'AppMain': {
                'name': 'AppMain',
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-078753dd',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/AppMain.vue',
                '_Ctor': {}
              },
              'Navbar': {
                'components': {
                  'Breadcrumb': {
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-b50ef614',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Breadcrumb/index.vue'
                  },
                  'Hamburger': {
                    'name': 'Hamburger',
                    'props': {
                      'isActive': {
                        'default': false
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-4e6f274c',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Hamburger/index.vue'
                  },
                  'ErrorLog': {
                    'name': 'ErrorLog',
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-cf51e862',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ErrorLog/index.vue'
                  },
                  'Screenfull': {
                    'name': 'Screenfull',
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-29234bee',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/components/Screenfull/index.vue'
                  },
                  'SizeSelect': {
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/SizeSelect/index.vue'
                  },
                  'Search': {
                    'name': 'HeaderSearch',
                    'computed': {},
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-032bd1f0',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/HeaderSearch/index.vue'
                  }
                },
                'computed': {},
                'methods': {},
                'staticRenderFns': [
                  null
                ],
                '_compiled': true,
                '_scopeId': 'data-v-d16d6306',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Navbar.vue',
                '_Ctor': {}
              },
              'RightPanel': {
                'name': 'RightPanel',
                'props': {
                  'clickNotClose': {
                    'default': false
                  },
                  'buttonTop': {
                    'default': 250
                  }
                },
                'computed': {},
                'watch': {},
                'beforeDestroy': [
                  null,
                  null
                ],
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-1e488bfb',
                'beforeCreate': [
                  null
                ],
                '__file': 'src/components/RightPanel/index.vue'
              },
              'Settings': {
                'components': {
                  'ThemePicker': {
                    'computed': {},
                    'watch': {
                      'defaultTheme': {
                        'immediate': true
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ThemePicker/index.vue'
                  }
                },
                'computed': {
                  'fixedHeader': {},
                  'tagsView': {},
                  'sidebarLogo': {}
                },
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-126b135a',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Settings/index.vue'
              },
              'Sidebar': {
                'components': {
                  'SidebarItem': {
                    'name': 'SidebarItem',
                    'components': {
                      'Item': {
                        'name': 'MenuItem',
                        'functional': true,
                        'props': {
                          'icon': {
                            'default': ''
                          },
                          'title': {
                            'default': ''
                          }
                        },
                        '_scopeId': 'data-v-31ea41b3',
                        '__file': 'src/layout/components/Sidebar/Item.vue'
                      },
                      'AppLink': {
                        'props': {
                          'to': {
                            'required': true
                          }
                        },
                        'computed': {},
                        'methods': {},
                        'staticRenderFns': [],
                        '_compiled': true,
                        'beforeCreate': [
                          null
                        ],
                        'beforeDestroy': [
                          null
                        ],
                        '__file': 'src/layout/components/Sidebar/Link.vue'
                      }
                    },
                    'mixins': [
                      {
                        'computed': {},
                        'methods': {}
                      }
                    ],
                    'props': {
                      'item': {
                        'required': true
                      },
                      'isNest': {
                        'default': false
                      },
                      'basePath': {
                        'default': ''
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-2d2bbdc2',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/layout/components/Sidebar/SidebarItem.vue'
                  }
                },
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-33ec43fc',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Sidebar/index.vue',
                '_Ctor': {}
              },
              'TagsView': {
                'components': {
                  'ScrollPane': {
                    'name': 'ScrollPane',
                    'computed': {},
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-be6b7bae',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/layout/components/TagsView/ScrollPane.vue'
                  }
                },
                'computed': {},
                'watch': {},
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-fac8ca64',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/TagsView/index.vue',
                '_Ctor': {}
              }
            },
            'mixins': [
              {
                'watch': {},
                'methods': {}
              }
            ],
            'computed': {},
            'methods': {},
            'staticRenderFns': [],
            '_compiled': true,
            '_scopeId': 'data-v-13877386',
            'beforeCreate': [
              null
            ],
            'beforeDestroy': [
              null
            ],
            '__file': 'src/layout/index.vue',
            '_Ctor': {}
          },
          'children': [
            {
              'path': 'index',
              'name': 'Tab',
              'meta': {
                'title': 'Tab',
                'icon': 'tab'
              }
            }
          ]
        },
        {
          'path': '/error',
          'component': {
            'name': 'Layout',
            'components': {
              'AppMain': {
                'name': 'AppMain',
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-078753dd',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/AppMain.vue',
                '_Ctor': {}
              },
              'Navbar': {
                'components': {
                  'Breadcrumb': {
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-b50ef614',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Breadcrumb/index.vue'
                  },
                  'Hamburger': {
                    'name': 'Hamburger',
                    'props': {
                      'isActive': {
                        'default': false
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-4e6f274c',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Hamburger/index.vue'
                  },
                  'ErrorLog': {
                    'name': 'ErrorLog',
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-cf51e862',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ErrorLog/index.vue'
                  },
                  'Screenfull': {
                    'name': 'Screenfull',
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-29234bee',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/components/Screenfull/index.vue'
                  },
                  'SizeSelect': {
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/SizeSelect/index.vue'
                  },
                  'Search': {
                    'name': 'HeaderSearch',
                    'computed': {},
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-032bd1f0',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/HeaderSearch/index.vue'
                  }
                },
                'computed': {},
                'methods': {},
                'staticRenderFns': [
                  null
                ],
                '_compiled': true,
                '_scopeId': 'data-v-d16d6306',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Navbar.vue',
                '_Ctor': {}
              },
              'RightPanel': {
                'name': 'RightPanel',
                'props': {
                  'clickNotClose': {
                    'default': false
                  },
                  'buttonTop': {
                    'default': 250
                  }
                },
                'computed': {},
                'watch': {},
                'beforeDestroy': [
                  null,
                  null
                ],
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-1e488bfb',
                'beforeCreate': [
                  null
                ],
                '__file': 'src/components/RightPanel/index.vue'
              },
              'Settings': {
                'components': {
                  'ThemePicker': {
                    'computed': {},
                    'watch': {
                      'defaultTheme': {
                        'immediate': true
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ThemePicker/index.vue'
                  }
                },
                'computed': {
                  'fixedHeader': {},
                  'tagsView': {},
                  'sidebarLogo': {}
                },
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-126b135a',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Settings/index.vue'
              },
              'Sidebar': {
                'components': {
                  'SidebarItem': {
                    'name': 'SidebarItem',
                    'components': {
                      'Item': {
                        'name': 'MenuItem',
                        'functional': true,
                        'props': {
                          'icon': {
                            'default': ''
                          },
                          'title': {
                            'default': ''
                          }
                        },
                        '_scopeId': 'data-v-31ea41b3',
                        '__file': 'src/layout/components/Sidebar/Item.vue'
                      },
                      'AppLink': {
                        'props': {
                          'to': {
                            'required': true
                          }
                        },
                        'computed': {},
                        'methods': {},
                        'staticRenderFns': [],
                        '_compiled': true,
                        'beforeCreate': [
                          null
                        ],
                        'beforeDestroy': [
                          null
                        ],
                        '__file': 'src/layout/components/Sidebar/Link.vue'
                      }
                    },
                    'mixins': [
                      {
                        'computed': {},
                        'methods': {}
                      }
                    ],
                    'props': {
                      'item': {
                        'required': true
                      },
                      'isNest': {
                        'default': false
                      },
                      'basePath': {
                        'default': ''
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-2d2bbdc2',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/layout/components/Sidebar/SidebarItem.vue'
                  }
                },
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-33ec43fc',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Sidebar/index.vue',
                '_Ctor': {}
              },
              'TagsView': {
                'components': {
                  'ScrollPane': {
                    'name': 'ScrollPane',
                    'computed': {},
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-be6b7bae',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/layout/components/TagsView/ScrollPane.vue'
                  }
                },
                'computed': {},
                'watch': {},
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-fac8ca64',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/TagsView/index.vue',
                '_Ctor': {}
              }
            },
            'mixins': [
              {
                'watch': {},
                'methods': {}
              }
            ],
            'computed': {},
            'methods': {},
            'staticRenderFns': [],
            '_compiled': true,
            '_scopeId': 'data-v-13877386',
            'beforeCreate': [
              null
            ],
            'beforeDestroy': [
              null
            ],
            '__file': 'src/layout/index.vue',
            '_Ctor': {}
          },
          'redirect': 'noRedirect',
          'name': 'ErrorPages',
          'meta': {
            'title': 'Error Pages',
            'icon': '404'
          },
          'children': [
            {
              'path': '401',
              'name': 'Page401',
              'meta': {
                'title': '401',
                'noCache': true
              }
            },
            {
              'path': '404',
              'name': 'Page404',
              'meta': {
                'title': '404',
                'noCache': true
              }
            }
          ]
        },
        {
          'path': '/error-log',
          'component': {
            'name': 'Layout',
            'components': {
              'AppMain': {
                'name': 'AppMain',
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-078753dd',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/AppMain.vue',
                '_Ctor': {}
              },
              'Navbar': {
                'components': {
                  'Breadcrumb': {
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-b50ef614',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Breadcrumb/index.vue'
                  },
                  'Hamburger': {
                    'name': 'Hamburger',
                    'props': {
                      'isActive': {
                        'default': false
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-4e6f274c',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Hamburger/index.vue'
                  },
                  'ErrorLog': {
                    'name': 'ErrorLog',
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-cf51e862',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ErrorLog/index.vue'
                  },
                  'Screenfull': {
                    'name': 'Screenfull',
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-29234bee',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/components/Screenfull/index.vue'
                  },
                  'SizeSelect': {
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/SizeSelect/index.vue'
                  },
                  'Search': {
                    'name': 'HeaderSearch',
                    'computed': {},
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-032bd1f0',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/HeaderSearch/index.vue'
                  }
                },
                'computed': {},
                'methods': {},
                'staticRenderFns': [
                  null
                ],
                '_compiled': true,
                '_scopeId': 'data-v-d16d6306',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Navbar.vue',
                '_Ctor': {}
              },
              'RightPanel': {
                'name': 'RightPanel',
                'props': {
                  'clickNotClose': {
                    'default': false
                  },
                  'buttonTop': {
                    'default': 250
                  }
                },
                'computed': {},
                'watch': {},
                'beforeDestroy': [
                  null,
                  null
                ],
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-1e488bfb',
                'beforeCreate': [
                  null
                ],
                '__file': 'src/components/RightPanel/index.vue'
              },
              'Settings': {
                'components': {
                  'ThemePicker': {
                    'computed': {},
                    'watch': {
                      'defaultTheme': {
                        'immediate': true
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ThemePicker/index.vue'
                  }
                },
                'computed': {
                  'fixedHeader': {},
                  'tagsView': {},
                  'sidebarLogo': {}
                },
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-126b135a',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Settings/index.vue'
              },
              'Sidebar': {
                'components': {
                  'SidebarItem': {
                    'name': 'SidebarItem',
                    'components': {
                      'Item': {
                        'name': 'MenuItem',
                        'functional': true,
                        'props': {
                          'icon': {
                            'default': ''
                          },
                          'title': {
                            'default': ''
                          }
                        },
                        '_scopeId': 'data-v-31ea41b3',
                        '__file': 'src/layout/components/Sidebar/Item.vue'
                      },
                      'AppLink': {
                        'props': {
                          'to': {
                            'required': true
                          }
                        },
                        'computed': {},
                        'methods': {},
                        'staticRenderFns': [],
                        '_compiled': true,
                        'beforeCreate': [
                          null
                        ],
                        'beforeDestroy': [
                          null
                        ],
                        '__file': 'src/layout/components/Sidebar/Link.vue'
                      }
                    },
                    'mixins': [
                      {
                        'computed': {},
                        'methods': {}
                      }
                    ],
                    'props': {
                      'item': {
                        'required': true
                      },
                      'isNest': {
                        'default': false
                      },
                      'basePath': {
                        'default': ''
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-2d2bbdc2',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/layout/components/Sidebar/SidebarItem.vue'
                  }
                },
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-33ec43fc',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Sidebar/index.vue',
                '_Ctor': {}
              },
              'TagsView': {
                'components': {
                  'ScrollPane': {
                    'name': 'ScrollPane',
                    'computed': {},
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-be6b7bae',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/layout/components/TagsView/ScrollPane.vue'
                  }
                },
                'computed': {},
                'watch': {},
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-fac8ca64',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/TagsView/index.vue',
                '_Ctor': {}
              }
            },
            'mixins': [
              {
                'watch': {},
                'methods': {}
              }
            ],
            'computed': {},
            'methods': {},
            'staticRenderFns': [],
            '_compiled': true,
            '_scopeId': 'data-v-13877386',
            'beforeCreate': [
              null
            ],
            'beforeDestroy': [
              null
            ],
            '__file': 'src/layout/index.vue',
            '_Ctor': {}
          },
          'children': [
            {
              'path': 'log',
              'name': 'ErrorLog',
              'meta': {
                'title': 'Error Log',
                'icon': 'bug'
              }
            }
          ]
        },
        {
          'path': '/excel',
          'component': {
            'name': 'Layout',
            'components': {
              'AppMain': {
                'name': 'AppMain',
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-078753dd',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/AppMain.vue',
                '_Ctor': {}
              },
              'Navbar': {
                'components': {
                  'Breadcrumb': {
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-b50ef614',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Breadcrumb/index.vue'
                  },
                  'Hamburger': {
                    'name': 'Hamburger',
                    'props': {
                      'isActive': {
                        'default': false
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-4e6f274c',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Hamburger/index.vue'
                  },
                  'ErrorLog': {
                    'name': 'ErrorLog',
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-cf51e862',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ErrorLog/index.vue'
                  },
                  'Screenfull': {
                    'name': 'Screenfull',
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-29234bee',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/components/Screenfull/index.vue'
                  },
                  'SizeSelect': {
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/SizeSelect/index.vue'
                  },
                  'Search': {
                    'name': 'HeaderSearch',
                    'computed': {},
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-032bd1f0',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/HeaderSearch/index.vue'
                  }
                },
                'computed': {},
                'methods': {},
                'staticRenderFns': [
                  null
                ],
                '_compiled': true,
                '_scopeId': 'data-v-d16d6306',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Navbar.vue',
                '_Ctor': {}
              },
              'RightPanel': {
                'name': 'RightPanel',
                'props': {
                  'clickNotClose': {
                    'default': false
                  },
                  'buttonTop': {
                    'default': 250
                  }
                },
                'computed': {},
                'watch': {},
                'beforeDestroy': [
                  null,
                  null
                ],
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-1e488bfb',
                'beforeCreate': [
                  null
                ],
                '__file': 'src/components/RightPanel/index.vue'
              },
              'Settings': {
                'components': {
                  'ThemePicker': {
                    'computed': {},
                    'watch': {
                      'defaultTheme': {
                        'immediate': true
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ThemePicker/index.vue'
                  }
                },
                'computed': {
                  'fixedHeader': {},
                  'tagsView': {},
                  'sidebarLogo': {}
                },
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-126b135a',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Settings/index.vue'
              },
              'Sidebar': {
                'components': {
                  'SidebarItem': {
                    'name': 'SidebarItem',
                    'components': {
                      'Item': {
                        'name': 'MenuItem',
                        'functional': true,
                        'props': {
                          'icon': {
                            'default': ''
                          },
                          'title': {
                            'default': ''
                          }
                        },
                        '_scopeId': 'data-v-31ea41b3',
                        '__file': 'src/layout/components/Sidebar/Item.vue'
                      },
                      'AppLink': {
                        'props': {
                          'to': {
                            'required': true
                          }
                        },
                        'computed': {},
                        'methods': {},
                        'staticRenderFns': [],
                        '_compiled': true,
                        'beforeCreate': [
                          null
                        ],
                        'beforeDestroy': [
                          null
                        ],
                        '__file': 'src/layout/components/Sidebar/Link.vue'
                      }
                    },
                    'mixins': [
                      {
                        'computed': {},
                        'methods': {}
                      }
                    ],
                    'props': {
                      'item': {
                        'required': true
                      },
                      'isNest': {
                        'default': false
                      },
                      'basePath': {
                        'default': ''
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-2d2bbdc2',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/layout/components/Sidebar/SidebarItem.vue'
                  }
                },
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-33ec43fc',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Sidebar/index.vue',
                '_Ctor': {}
              },
              'TagsView': {
                'components': {
                  'ScrollPane': {
                    'name': 'ScrollPane',
                    'computed': {},
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-be6b7bae',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/layout/components/TagsView/ScrollPane.vue'
                  }
                },
                'computed': {},
                'watch': {},
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-fac8ca64',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/TagsView/index.vue',
                '_Ctor': {}
              }
            },
            'mixins': [
              {
                'watch': {},
                'methods': {}
              }
            ],
            'computed': {},
            'methods': {},
            'staticRenderFns': [],
            '_compiled': true,
            '_scopeId': 'data-v-13877386',
            'beforeCreate': [
              null
            ],
            'beforeDestroy': [
              null
            ],
            '__file': 'src/layout/index.vue',
            '_Ctor': {}
          },
          'redirect': '/excel/export-excel',
          'name': 'Excel',
          'meta': {
            'title': 'Excel',
            'icon': 'excel'
          },
          'children': [
            {
              'path': 'export-excel',
              'name': 'ExportExcel',
              'meta': {
                'title': 'Export Excel'
              }
            },
            {
              'path': 'export-selected-excel',
              'name': 'SelectExcel',
              'meta': {
                'title': 'Export Selected'
              }
            },
            {
              'path': 'export-merge-header',
              'name': 'MergeHeader',
              'meta': {
                'title': 'Merge Header'
              }
            },
            {
              'path': 'upload-excel',
              'name': 'UploadExcel',
              'meta': {
                'title': 'Upload Excel'
              }
            }
          ]
        },
        {
          'path': '/zip',
          'component': {
            'name': 'Layout',
            'components': {
              'AppMain': {
                'name': 'AppMain',
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-078753dd',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/AppMain.vue',
                '_Ctor': {}
              },
              'Navbar': {
                'components': {
                  'Breadcrumb': {
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-b50ef614',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Breadcrumb/index.vue'
                  },
                  'Hamburger': {
                    'name': 'Hamburger',
                    'props': {
                      'isActive': {
                        'default': false
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-4e6f274c',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Hamburger/index.vue'
                  },
                  'ErrorLog': {
                    'name': 'ErrorLog',
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-cf51e862',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ErrorLog/index.vue'
                  },
                  'Screenfull': {
                    'name': 'Screenfull',
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-29234bee',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/components/Screenfull/index.vue'
                  },
                  'SizeSelect': {
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/SizeSelect/index.vue'
                  },
                  'Search': {
                    'name': 'HeaderSearch',
                    'computed': {},
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-032bd1f0',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/HeaderSearch/index.vue'
                  }
                },
                'computed': {},
                'methods': {},
                'staticRenderFns': [
                  null
                ],
                '_compiled': true,
                '_scopeId': 'data-v-d16d6306',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Navbar.vue',
                '_Ctor': {}
              },
              'RightPanel': {
                'name': 'RightPanel',
                'props': {
                  'clickNotClose': {
                    'default': false
                  },
                  'buttonTop': {
                    'default': 250
                  }
                },
                'computed': {},
                'watch': {},
                'beforeDestroy': [
                  null,
                  null
                ],
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-1e488bfb',
                'beforeCreate': [
                  null
                ],
                '__file': 'src/components/RightPanel/index.vue'
              },
              'Settings': {
                'components': {
                  'ThemePicker': {
                    'computed': {},
                    'watch': {
                      'defaultTheme': {
                        'immediate': true
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ThemePicker/index.vue'
                  }
                },
                'computed': {
                  'fixedHeader': {},
                  'tagsView': {},
                  'sidebarLogo': {}
                },
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-126b135a',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Settings/index.vue'
              },
              'Sidebar': {
                'components': {
                  'SidebarItem': {
                    'name': 'SidebarItem',
                    'components': {
                      'Item': {
                        'name': 'MenuItem',
                        'functional': true,
                        'props': {
                          'icon': {
                            'default': ''
                          },
                          'title': {
                            'default': ''
                          }
                        },
                        '_scopeId': 'data-v-31ea41b3',
                        '__file': 'src/layout/components/Sidebar/Item.vue'
                      },
                      'AppLink': {
                        'props': {
                          'to': {
                            'required': true
                          }
                        },
                        'computed': {},
                        'methods': {},
                        'staticRenderFns': [],
                        '_compiled': true,
                        'beforeCreate': [
                          null
                        ],
                        'beforeDestroy': [
                          null
                        ],
                        '__file': 'src/layout/components/Sidebar/Link.vue'
                      }
                    },
                    'mixins': [
                      {
                        'computed': {},
                        'methods': {}
                      }
                    ],
                    'props': {
                      'item': {
                        'required': true
                      },
                      'isNest': {
                        'default': false
                      },
                      'basePath': {
                        'default': ''
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-2d2bbdc2',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/layout/components/Sidebar/SidebarItem.vue'
                  }
                },
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-33ec43fc',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Sidebar/index.vue',
                '_Ctor': {}
              },
              'TagsView': {
                'components': {
                  'ScrollPane': {
                    'name': 'ScrollPane',
                    'computed': {},
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-be6b7bae',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/layout/components/TagsView/ScrollPane.vue'
                  }
                },
                'computed': {},
                'watch': {},
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-fac8ca64',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/TagsView/index.vue',
                '_Ctor': {}
              }
            },
            'mixins': [
              {
                'watch': {},
                'methods': {}
              }
            ],
            'computed': {},
            'methods': {},
            'staticRenderFns': [],
            '_compiled': true,
            '_scopeId': 'data-v-13877386',
            'beforeCreate': [
              null
            ],
            'beforeDestroy': [
              null
            ],
            '__file': 'src/layout/index.vue',
            '_Ctor': {}
          },
          'redirect': '/zip/download',
          'alwaysShow': true,
          'name': 'Zip',
          'meta': {
            'title': 'Zip',
            'icon': 'zip'
          },
          'children': [
            {
              'path': 'download',
              'name': 'ExportZip',
              'meta': {
                'title': 'Export Zip'
              }
            }
          ]
        },
        {
          'path': '/pdf',
          'component': {
            'name': 'Layout',
            'components': {
              'AppMain': {
                'name': 'AppMain',
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-078753dd',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/AppMain.vue',
                '_Ctor': {}
              },
              'Navbar': {
                'components': {
                  'Breadcrumb': {
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-b50ef614',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Breadcrumb/index.vue'
                  },
                  'Hamburger': {
                    'name': 'Hamburger',
                    'props': {
                      'isActive': {
                        'default': false
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-4e6f274c',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Hamburger/index.vue'
                  },
                  'ErrorLog': {
                    'name': 'ErrorLog',
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-cf51e862',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ErrorLog/index.vue'
                  },
                  'Screenfull': {
                    'name': 'Screenfull',
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-29234bee',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/components/Screenfull/index.vue'
                  },
                  'SizeSelect': {
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/SizeSelect/index.vue'
                  },
                  'Search': {
                    'name': 'HeaderSearch',
                    'computed': {},
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-032bd1f0',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/HeaderSearch/index.vue'
                  }
                },
                'computed': {},
                'methods': {},
                'staticRenderFns': [
                  null
                ],
                '_compiled': true,
                '_scopeId': 'data-v-d16d6306',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Navbar.vue',
                '_Ctor': {}
              },
              'RightPanel': {
                'name': 'RightPanel',
                'props': {
                  'clickNotClose': {
                    'default': false
                  },
                  'buttonTop': {
                    'default': 250
                  }
                },
                'computed': {},
                'watch': {},
                'beforeDestroy': [
                  null,
                  null
                ],
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-1e488bfb',
                'beforeCreate': [
                  null
                ],
                '__file': 'src/components/RightPanel/index.vue'
              },
              'Settings': {
                'components': {
                  'ThemePicker': {
                    'computed': {},
                    'watch': {
                      'defaultTheme': {
                        'immediate': true
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ThemePicker/index.vue'
                  }
                },
                'computed': {
                  'fixedHeader': {},
                  'tagsView': {},
                  'sidebarLogo': {}
                },
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-126b135a',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Settings/index.vue'
              },
              'Sidebar': {
                'components': {
                  'SidebarItem': {
                    'name': 'SidebarItem',
                    'components': {
                      'Item': {
                        'name': 'MenuItem',
                        'functional': true,
                        'props': {
                          'icon': {
                            'default': ''
                          },
                          'title': {
                            'default': ''
                          }
                        },
                        '_scopeId': 'data-v-31ea41b3',
                        '__file': 'src/layout/components/Sidebar/Item.vue'
                      },
                      'AppLink': {
                        'props': {
                          'to': {
                            'required': true
                          }
                        },
                        'computed': {},
                        'methods': {},
                        'staticRenderFns': [],
                        '_compiled': true,
                        'beforeCreate': [
                          null
                        ],
                        'beforeDestroy': [
                          null
                        ],
                        '__file': 'src/layout/components/Sidebar/Link.vue'
                      }
                    },
                    'mixins': [
                      {
                        'computed': {},
                        'methods': {}
                      }
                    ],
                    'props': {
                      'item': {
                        'required': true
                      },
                      'isNest': {
                        'default': false
                      },
                      'basePath': {
                        'default': ''
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-2d2bbdc2',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/layout/components/Sidebar/SidebarItem.vue'
                  }
                },
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-33ec43fc',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Sidebar/index.vue',
                '_Ctor': {}
              },
              'TagsView': {
                'components': {
                  'ScrollPane': {
                    'name': 'ScrollPane',
                    'computed': {},
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-be6b7bae',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/layout/components/TagsView/ScrollPane.vue'
                  }
                },
                'computed': {},
                'watch': {},
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-fac8ca64',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/TagsView/index.vue',
                '_Ctor': {}
              }
            },
            'mixins': [
              {
                'watch': {},
                'methods': {}
              }
            ],
            'computed': {},
            'methods': {},
            'staticRenderFns': [],
            '_compiled': true,
            '_scopeId': 'data-v-13877386',
            'beforeCreate': [
              null
            ],
            'beforeDestroy': [
              null
            ],
            '__file': 'src/layout/index.vue',
            '_Ctor': {}
          },
          'redirect': '/pdf/index',
          'children': [
            {
              'path': 'index',
              'name': 'PDF',
              'meta': {
                'title': 'PDF',
                'icon': 'pdf'
              }
            }
          ]
        },
        {
          'path': '/pdf/download',
          'hidden': true
        },
        {
          'path': '/theme',
          'component': {
            'name': 'Layout',
            'components': {
              'AppMain': {
                'name': 'AppMain',
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-078753dd',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/AppMain.vue',
                '_Ctor': {}
              },
              'Navbar': {
                'components': {
                  'Breadcrumb': {
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-b50ef614',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Breadcrumb/index.vue'
                  },
                  'Hamburger': {
                    'name': 'Hamburger',
                    'props': {
                      'isActive': {
                        'default': false
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-4e6f274c',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Hamburger/index.vue'
                  },
                  'ErrorLog': {
                    'name': 'ErrorLog',
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-cf51e862',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ErrorLog/index.vue'
                  },
                  'Screenfull': {
                    'name': 'Screenfull',
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-29234bee',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/components/Screenfull/index.vue'
                  },
                  'SizeSelect': {
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/SizeSelect/index.vue'
                  },
                  'Search': {
                    'name': 'HeaderSearch',
                    'computed': {},
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-032bd1f0',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/HeaderSearch/index.vue'
                  }
                },
                'computed': {},
                'methods': {},
                'staticRenderFns': [
                  null
                ],
                '_compiled': true,
                '_scopeId': 'data-v-d16d6306',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Navbar.vue',
                '_Ctor': {}
              },
              'RightPanel': {
                'name': 'RightPanel',
                'props': {
                  'clickNotClose': {
                    'default': false
                  },
                  'buttonTop': {
                    'default': 250
                  }
                },
                'computed': {},
                'watch': {},
                'beforeDestroy': [
                  null,
                  null
                ],
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-1e488bfb',
                'beforeCreate': [
                  null
                ],
                '__file': 'src/components/RightPanel/index.vue'
              },
              'Settings': {
                'components': {
                  'ThemePicker': {
                    'computed': {},
                    'watch': {
                      'defaultTheme': {
                        'immediate': true
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ThemePicker/index.vue'
                  }
                },
                'computed': {
                  'fixedHeader': {},
                  'tagsView': {},
                  'sidebarLogo': {}
                },
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-126b135a',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Settings/index.vue'
              },
              'Sidebar': {
                'components': {
                  'SidebarItem': {
                    'name': 'SidebarItem',
                    'components': {
                      'Item': {
                        'name': 'MenuItem',
                        'functional': true,
                        'props': {
                          'icon': {
                            'default': ''
                          },
                          'title': {
                            'default': ''
                          }
                        },
                        '_scopeId': 'data-v-31ea41b3',
                        '__file': 'src/layout/components/Sidebar/Item.vue'
                      },
                      'AppLink': {
                        'props': {
                          'to': {
                            'required': true
                          }
                        },
                        'computed': {},
                        'methods': {},
                        'staticRenderFns': [],
                        '_compiled': true,
                        'beforeCreate': [
                          null
                        ],
                        'beforeDestroy': [
                          null
                        ],
                        '__file': 'src/layout/components/Sidebar/Link.vue'
                      }
                    },
                    'mixins': [
                      {
                        'computed': {},
                        'methods': {}
                      }
                    ],
                    'props': {
                      'item': {
                        'required': true
                      },
                      'isNest': {
                        'default': false
                      },
                      'basePath': {
                        'default': ''
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-2d2bbdc2',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/layout/components/Sidebar/SidebarItem.vue'
                  }
                },
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-33ec43fc',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Sidebar/index.vue',
                '_Ctor': {}
              },
              'TagsView': {
                'components': {
                  'ScrollPane': {
                    'name': 'ScrollPane',
                    'computed': {},
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-be6b7bae',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/layout/components/TagsView/ScrollPane.vue'
                  }
                },
                'computed': {},
                'watch': {},
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-fac8ca64',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/TagsView/index.vue',
                '_Ctor': {}
              }
            },
            'mixins': [
              {
                'watch': {},
                'methods': {}
              }
            ],
            'computed': {},
            'methods': {},
            'staticRenderFns': [],
            '_compiled': true,
            '_scopeId': 'data-v-13877386',
            'beforeCreate': [
              null
            ],
            'beforeDestroy': [
              null
            ],
            '__file': 'src/layout/index.vue',
            '_Ctor': {}
          },
          'children': [
            {
              'path': 'index',
              'name': 'Theme',
              'meta': {
                'title': 'Theme',
                'icon': 'theme'
              }
            }
          ]
        },
        {
          'path': '/clipboard',
          'component': {
            'name': 'Layout',
            'components': {
              'AppMain': {
                'name': 'AppMain',
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-078753dd',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/AppMain.vue',
                '_Ctor': {}
              },
              'Navbar': {
                'components': {
                  'Breadcrumb': {
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-b50ef614',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Breadcrumb/index.vue'
                  },
                  'Hamburger': {
                    'name': 'Hamburger',
                    'props': {
                      'isActive': {
                        'default': false
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-4e6f274c',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Hamburger/index.vue'
                  },
                  'ErrorLog': {
                    'name': 'ErrorLog',
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-cf51e862',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ErrorLog/index.vue'
                  },
                  'Screenfull': {
                    'name': 'Screenfull',
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-29234bee',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/components/Screenfull/index.vue'
                  },
                  'SizeSelect': {
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/SizeSelect/index.vue'
                  },
                  'Search': {
                    'name': 'HeaderSearch',
                    'computed': {},
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-032bd1f0',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/HeaderSearch/index.vue'
                  }
                },
                'computed': {},
                'methods': {},
                'staticRenderFns': [
                  null
                ],
                '_compiled': true,
                '_scopeId': 'data-v-d16d6306',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Navbar.vue',
                '_Ctor': {}
              },
              'RightPanel': {
                'name': 'RightPanel',
                'props': {
                  'clickNotClose': {
                    'default': false
                  },
                  'buttonTop': {
                    'default': 250
                  }
                },
                'computed': {},
                'watch': {},
                'beforeDestroy': [
                  null,
                  null
                ],
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-1e488bfb',
                'beforeCreate': [
                  null
                ],
                '__file': 'src/components/RightPanel/index.vue'
              },
              'Settings': {
                'components': {
                  'ThemePicker': {
                    'computed': {},
                    'watch': {
                      'defaultTheme': {
                        'immediate': true
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ThemePicker/index.vue'
                  }
                },
                'computed': {
                  'fixedHeader': {},
                  'tagsView': {},
                  'sidebarLogo': {}
                },
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-126b135a',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Settings/index.vue'
              },
              'Sidebar': {
                'components': {
                  'SidebarItem': {
                    'name': 'SidebarItem',
                    'components': {
                      'Item': {
                        'name': 'MenuItem',
                        'functional': true,
                        'props': {
                          'icon': {
                            'default': ''
                          },
                          'title': {
                            'default': ''
                          }
                        },
                        '_scopeId': 'data-v-31ea41b3',
                        '__file': 'src/layout/components/Sidebar/Item.vue'
                      },
                      'AppLink': {
                        'props': {
                          'to': {
                            'required': true
                          }
                        },
                        'computed': {},
                        'methods': {},
                        'staticRenderFns': [],
                        '_compiled': true,
                        'beforeCreate': [
                          null
                        ],
                        'beforeDestroy': [
                          null
                        ],
                        '__file': 'src/layout/components/Sidebar/Link.vue'
                      }
                    },
                    'mixins': [
                      {
                        'computed': {},
                        'methods': {}
                      }
                    ],
                    'props': {
                      'item': {
                        'required': true
                      },
                      'isNest': {
                        'default': false
                      },
                      'basePath': {
                        'default': ''
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-2d2bbdc2',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/layout/components/Sidebar/SidebarItem.vue'
                  }
                },
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-33ec43fc',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Sidebar/index.vue',
                '_Ctor': {}
              },
              'TagsView': {
                'components': {
                  'ScrollPane': {
                    'name': 'ScrollPane',
                    'computed': {},
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-be6b7bae',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/layout/components/TagsView/ScrollPane.vue'
                  }
                },
                'computed': {},
                'watch': {},
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-fac8ca64',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/TagsView/index.vue',
                '_Ctor': {}
              }
            },
            'mixins': [
              {
                'watch': {},
                'methods': {}
              }
            ],
            'computed': {},
            'methods': {},
            'staticRenderFns': [],
            '_compiled': true,
            '_scopeId': 'data-v-13877386',
            'beforeCreate': [
              null
            ],
            'beforeDestroy': [
              null
            ],
            '__file': 'src/layout/index.vue',
            '_Ctor': {}
          },
          'children': [
            {
              'path': 'index',
              'name': 'ClipboardDemo',
              'meta': {
                'title': 'Clipboard',
                'icon': 'clipboard'
              }
            }
          ]
        },
        {
          'path': 'external-link',
          'component': {
            'name': 'Layout',
            'components': {
              'AppMain': {
                'name': 'AppMain',
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-078753dd',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/AppMain.vue',
                '_Ctor': {}
              },
              'Navbar': {
                'components': {
                  'Breadcrumb': {
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-b50ef614',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Breadcrumb/index.vue'
                  },
                  'Hamburger': {
                    'name': 'Hamburger',
                    'props': {
                      'isActive': {
                        'default': false
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-4e6f274c',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/Hamburger/index.vue'
                  },
                  'ErrorLog': {
                    'name': 'ErrorLog',
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-cf51e862',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ErrorLog/index.vue'
                  },
                  'Screenfull': {
                    'name': 'Screenfull',
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-29234bee',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/components/Screenfull/index.vue'
                  },
                  'SizeSelect': {
                    'computed': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/SizeSelect/index.vue'
                  },
                  'Search': {
                    'name': 'HeaderSearch',
                    'computed': {},
                    'watch': {},
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-032bd1f0',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/HeaderSearch/index.vue'
                  }
                },
                'computed': {},
                'methods': {},
                'staticRenderFns': [
                  null
                ],
                '_compiled': true,
                '_scopeId': 'data-v-d16d6306',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Navbar.vue',
                '_Ctor': {}
              },
              'RightPanel': {
                'name': 'RightPanel',
                'props': {
                  'clickNotClose': {
                    'default': false
                  },
                  'buttonTop': {
                    'default': 250
                  }
                },
                'computed': {},
                'watch': {},
                'beforeDestroy': [
                  null,
                  null
                ],
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-1e488bfb',
                'beforeCreate': [
                  null
                ],
                '__file': 'src/components/RightPanel/index.vue'
              },
              'Settings': {
                'components': {
                  'ThemePicker': {
                    'computed': {},
                    'watch': {
                      'defaultTheme': {
                        'immediate': true
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/components/ThemePicker/index.vue'
                  }
                },
                'computed': {
                  'fixedHeader': {},
                  'tagsView': {},
                  'sidebarLogo': {}
                },
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-126b135a',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Settings/index.vue'
              },
              'Sidebar': {
                'components': {
                  'SidebarItem': {
                    'name': 'SidebarItem',
                    'components': {
                      'Item': {
                        'name': 'MenuItem',
                        'functional': true,
                        'props': {
                          'icon': {
                            'default': ''
                          },
                          'title': {
                            'default': ''
                          }
                        },
                        '_scopeId': 'data-v-31ea41b3',
                        '__file': 'src/layout/components/Sidebar/Item.vue'
                      },
                      'AppLink': {
                        'props': {
                          'to': {
                            'required': true
                          }
                        },
                        'computed': {},
                        'methods': {},
                        'staticRenderFns': [],
                        '_compiled': true,
                        'beforeCreate': [
                          null
                        ],
                        'beforeDestroy': [
                          null
                        ],
                        '__file': 'src/layout/components/Sidebar/Link.vue'
                      }
                    },
                    'mixins': [
                      {
                        'computed': {},
                        'methods': {}
                      }
                    ],
                    'props': {
                      'item': {
                        'required': true
                      },
                      'isNest': {
                        'default': false
                      },
                      'basePath': {
                        'default': ''
                      }
                    },
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-2d2bbdc2',
                    'beforeCreate': [
                      null
                    ],
                    'beforeDestroy': [
                      null
                    ],
                    '__file': 'src/layout/components/Sidebar/SidebarItem.vue'
                  }
                },
                'computed': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-33ec43fc',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/Sidebar/index.vue',
                '_Ctor': {}
              },
              'TagsView': {
                'components': {
                  'ScrollPane': {
                    'name': 'ScrollPane',
                    'computed': {},
                    'beforeDestroy': [
                      null,
                      null
                    ],
                    'methods': {},
                    'staticRenderFns': [],
                    '_compiled': true,
                    '_scopeId': 'data-v-be6b7bae',
                    'beforeCreate': [
                      null
                    ],
                    '__file': 'src/layout/components/TagsView/ScrollPane.vue'
                  }
                },
                'computed': {},
                'watch': {},
                'methods': {},
                'staticRenderFns': [],
                '_compiled': true,
                '_scopeId': 'data-v-fac8ca64',
                'beforeCreate': [
                  null
                ],
                'beforeDestroy': [
                  null
                ],
                '__file': 'src/layout/components/TagsView/index.vue',
                '_Ctor': {}
              }
            },
            'mixins': [
              {
                'watch': {},
                'methods': {}
              }
            ],
            'computed': {},
            'methods': {},
            'staticRenderFns': [],
            '_compiled': true,
            '_scopeId': 'data-v-13877386',
            'beforeCreate': [
              null
            ],
            'beforeDestroy': [
              null
            ],
            '__file': 'src/layout/index.vue',
            '_Ctor': {}
          },
          'children': [
            {
              'path': 'https://github.com/PanJiaChen/vue-element-admin',
              'meta': {
                'title': 'External Link',
                'icon': 'link'
              }
            }
          ]
        },
        {
          'path': '*',
          'redirect': '/404',
          'hidden': true
        }
      ]
    };
  },

  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    activeMenu () {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        console.log('meta.activeMenu', meta.activeMenu);
        return meta.activeMenu;
      }
      console.log('path', path);
      return path;
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo;
    },
    variables () {
      return variables;
    },
    isCollapse () {
      return !this.sidebar.opened;
    }
  },
  created () {
    console.log(this.permission_routes, 'permission_routes');
  }
};
</script>
<style lang="scss" scoped>
.sibar-container{
  position: absolute;
  width: 240px;
  margin-top: -32px;
  .search-content{
    height: 42px;
    background-color: #0c2750;
    .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view .el-menu {
      background-color: red;
    }
    .icont-menu{
      font-size: 20px;
      height: 42px;
      text-align: center;
      line-height: 42px;
    }
  }
  .el-menu-item {}
}
.el-menu-item.is-active{
  background-color: yellow;
}
</style>
