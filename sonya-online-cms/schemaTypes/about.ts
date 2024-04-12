import {defineField} from 'sanity'

const about = {
  name: 'about',
  title: 'About',
  type: 'document',
  options: {
    singleton: true, // Identify this document as a singleton
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Picture',
      name: 'picture',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ],
}

export default about
