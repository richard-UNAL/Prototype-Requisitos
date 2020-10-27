const FIELD_TYPE = {
  text: "TEXT",
  select: "SELECT",
};

const MESSAGE_TYPE = {
    input: "INPUT",
    modify: "MODIFY"
}

const epIds = [
  {
    id: "teacher_creates_question",
    title: "Create question",
    paragraph: "Create a new Question",
    button: "Create",
    destination: "questions",
    input: MESSAGE_TYPE.input,
    fields: [
      {
        id: "predicate",
        label: "Predicate",
        type: FIELD_TYPE.text,
      },
      {
        id: "id",
        label: "ID",
        type: FIELD_TYPE.text,
      },
      {
        id: "answer_question",
        label: "Answer questions",
        type: FIELD_TYPE.text,
      },
      {
        id: "quiz",
        label: "Quiz",
        type: FIELD_TYPE.select,
        source: {
          data: "quiz",
          value: "id",
          display: "id",
        },
      },
    ],
  },
  {
    id: "teacher_modifies_question",
    title: "Modifies questions",
    paragraph: "Modifies an existing question",
    button: "Modify",
    input: MESSAGE_TYPE.modify,
    destination: "questions",
    destination_value: "id",
    fields: [
      {
        id: "predicate",
        label: "Predicate",
        type: FIELD_TYPE.text,
        destination: "questions",
      },
      {
        id: "id",
        label: "ID",
        type: FIELD_TYPE.text,
        destination: "questions",
      },
      {
        id: "answer_question",
        label: "Answer questions",
        type: FIELD_TYPE.text,
        destination: "questions",
      },
      {
        id: "quiz",
        label: "Quiz",
        type: FIELD_TYPE.select,
        source: {
          data: "quiz",
          value: "id",
          display: "id",
        },
      },
    ],
  },
];
