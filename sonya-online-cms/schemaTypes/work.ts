import {defineField, defineType} from 'sanity'
import {MdWork as icon} from 'react-icons/md'

const work = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  icon,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Name of the project',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Description of the project',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'url',
      description: 'Link to the live project',
    }),
    defineField({
      title: 'Picture',
      name: 'picture',
      type: 'image',
      description: 'Still of the project',
    }),
    defineField({
      title: 'TechStack',
      name: 'techstack',
      type: 'array',
      of: [{type: 'technology'}],
      validation: (Rule) => Rule.required().min(1).unique(),
    }),
  ],
})

export default work
