import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Email System')
        .child(
          S.list()
            .title('Email System')
            .items([
              S.listItem()
                .title('Email Flows')
                .schemaType('emailFlow')
                .child(S.documentTypeList('emailFlow').title('Email Flows')),
              S.listItem()
                .title('Email Templates')
                .schemaType('emailTemplate')
                .child(S.documentTypeList('emailTemplate').title('Email Templates')),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['emailTemplate', 'emailFlow'].includes(listItem.getId() ?? '')
      ),
    ])
