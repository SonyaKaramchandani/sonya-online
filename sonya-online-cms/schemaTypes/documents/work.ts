import {defineField, defineType} from 'sanity'
import {MdWork as icon} from 'react-icons/md'

export default defineType({
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
      type: 'text',
      description: 'Description of the project',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Date project was completed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1).unique(),
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
