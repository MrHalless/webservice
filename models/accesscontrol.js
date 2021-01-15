const { Schema, model } = require('mongoose');

//
// В данной схеме мы отображаем страницу
// в зависимости от доступа, выбранного админом
//
const accesscontrolShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    required: true,
  },

  view: {
    views: {
      viewTranslate: {
        flag: {
          type: Boolean,
          required: false,
          default: false,
        },
        description: {
          type: String,
          required: false,
          default: 'Перевод текста',
        },
      },

      viewFileHandling: {
        viewSendHandling: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Отправить на обработку',
          },
        },
        viewJournalAPK: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Журнал АПК',
          },
        },
        viewJournalComplex: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Журнал комплекса',
          },
        },
        viewJournalSubdiv: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Журнал подразделения',
          },
        },
        viewJournalOperator: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Мой журнал',
          },
        },
        viewFileStatisticAPK: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Статистика АПК',
          },
        },
        viewFileStatisticComplex: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Статистика комплекса',
          },
        },
        viewFileStatisticSubdiv: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Статистика подразделения',
          },
        },
        viewFileStatisticOperator: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Моя статистика',
          },
        },
      },
      viewTasks: {
        viewTasksAPK: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Журнал АПК',
          },
        },
        viewTasksComplex: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Журнал комплекса',
          },
        },
        viewTasksSubdiv: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Журнал подразделения',
          },
        },
        viewTasksOperator: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Мой журнал',
          },
        },
        viewTasksStatisticAPK: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Статистика АПК',
          },
        },
        viewTasksStatisticComplex: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Статистика комплекса',
          },
        },
        viewTasksStatisticSubdiv: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Статистика подразделения',
          },
        },
        viewTasksStatisticOperator: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Моя статистика',
          },
        },
      },
      viewChat: {
        flag: {
          type: Boolean,
          required: false,
          default: false,
        },
        description: {
          type: String,
          required: false,
          default: 'Чат',
        },
      },
      viewPMS: {
        viewPrioritizationPMS: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Приоритезация',
          },
        },
        viewStatisticPMS: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Статистика',
          },
        },
      },
      viewStructure: {
        viewComplexs: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Комплексы',
          },
        },
        viewServers: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Серверы',
          },
        },
        viewSubdivs: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Подразделения',
          },
        },

        viewUsers: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Пользователи',
          },
        },
        viewMatrix: {
          flag: {
            type: Boolean,
            required: false,
            default: false,
          },
          description: {
            type: String,
            required: false,
            default: 'Матрица разграничения доступа',
          },
        },
      },

      // viewServer: {
      //   flag: {
      //     type: Boolean,
      //     required: false,
      //     default: false,
      //   },
      //   description: {
      //     type: String,
      //     required: false,
      //     default: 'Добавление сервера',
      //   },
      // },

      // viewPms: {
      //   flag: {
      //     type: Boolean,
      //     required: false,
      //     default: false,
      //   },
      //   description: {
      //     type: String,
      //     required: false,
      //     default: 'ПМС',
      //   },
      // },

      // viewMonitoring: {
      //   flag: {
      //     type: Boolean,
      //     required: false,
      //     default: false,
      //   },
      //   description: {
      //     type: String,
      //     required: false,
      //     default: 'Мониторинг серверов',
      //   },
      // },

      // viewUsers: {
      //   flag: {
      //     type: Boolean,
      //     required: false,
      //     default: false,
      //   },
      //   description: {
      //     type: String,
      //     required: false,
      //     default: 'Пользователи',
      //   },
      // },

      // viewComplex: {
      //   flag: {
      //     type: Boolean,
      //     required: false,
      //     default: false,
      //   },
      //   description: {
      //     type: String,
      //     required: false,
      //     default: 'Добавление комплекса',
      //   },
      // },

      // viewTasks: {
      //   flag: {
      //     type: Boolean,
      //     required: false,
      //     default: false,
      //   },
      //   description: {
      //     type: String,
      //     required: false,
      //     default: 'Постановка задач',
      //   },
      // },

      // viewLanguages: {
      //   flag: {
      //     type: Boolean,
      //     required: false,
      //     default: false,
      //   },
      //   description: {
      //     type: String,
      //     required: false,
      //     default: 'Языковой профиль',
      //   },
      // },

      // viewAccess: {
      //   flag: {
      //     type: Boolean,
      //     required: false,
      //     default: false,
      //   },
      //   description: {
      //     type: String,
      //     required: false,
      //     default: 'Матрица доступа',
      //   },
      // },

      // viewChain: {
      //   flag: {
      //     type: Boolean,
      //     required: false,
      //     default: false,
      //   },
      //   description: {
      //     type: String,
      //     required: false,
      //     default: 'Построение цепей',
      //   },
      // },

      // viewSynchronization: {
      //   flag: {
      //     type: Boolean,
      //     required: false,
      //     default: false,
      //   },
      //   description: {
      //     type: String,
      //     required: false,
      //     default: 'Синхронизация',
      //   },
      // },

      //   {
      //     viewChat: {
      //       type: Boolean,
      //       required: false,
      //       default: false,
      //     },
      //   },
      //   {
      //     viewTasks: {
      //       type: Boolean,
      //       required: false,
      //       default: false,
      //     },
      //   },
      //   {
      //     viewPms: {
      //       type: Boolean,
      //       required: false,
      //       default: false,
      //     },
      //   },
      //   {
      //     viewStruct: {
      //       type: Boolean,
      //       required: false,
      //       default: false,
      //     },
      //   },
    },
  },
});

module.exports = model('AccessControl', accesscontrolShema);
