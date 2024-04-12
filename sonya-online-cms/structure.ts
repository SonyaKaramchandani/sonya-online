import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Base')
    .items([
      S.listItem().title('About').child(S.document().schemaType('about').documentId('about')),
      ...S.documentTypeListItems().filter(
        (listItem) => !['about'].includes(listItem.getId() ?? ''),
      ),
    ])
