import React from 'react'
import testCard from './test-cards'
import { IssueCardCollection } from '../components'

const collectionOne = [testCard(), testCard(), testCard()]
const collectionTwo = [testCard(), testCard()]

export const columnizerConfig = {
  pages: [
    {
      id: 'queue',
      name: 'queue',
      component: <IssueCardCollection collection={collectionOne} />,
    },
    {
      id: 'in_progress',
      name: 'in progress',
      component: <IssueCardCollection collection={collectionTwo} />,
    },
  ],
}
