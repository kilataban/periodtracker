import React from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { PageContainer } from '../components/layout/PageContainer'
import { BackgroundTheme } from '../components/layout/BackgroundTheme'
import { useSelector } from '../hooks/useSelector'
import * as selectors from '../redux/selectors'
import { Header } from '../components/common/Header'
import { Text, TextWithoutTranslation } from '../components/common/Text'
import { useTextToSpeechHook } from '../hooks/useTextToSpeechHook'
import { IconButton } from '../components/common/buttons/IconButton'
import { useSound } from '../components/context/SoundContext'
import { AWS_S3_BASE_URL } from '../config'
import { canAccessArticle } from '../services/restriction'
import HTML from 'react-native-render-html'
import { cleanHTML } from '../services/html'

const ArticleItem = ({ article, index, articles }) => {
  const currentUser = useSelector(selectors.currentUserSelector)
  const articleObject = useSelector((state) => selectors.articleByIDSelector(state, article))
  const { playSound } = useSound()

  if (!canAccessArticle(articleObject, currentUser)) {
    return null
  }

  return (
    <ArticleContainer
      style={{
        width: '95%',
        minWidth: '95%',
        marginBottom: index === articles.length - 1 ? 20 : 5,
      }}
    >
      <Row style={{ alignItems: 'center' }}>
        <ArticleTitle>{articleObject.subCategory}</ArticleTitle>
        {articleObject?.voiceOverKey && (
          <IconButton
            onPress={() => playSound(`${AWS_S3_BASE_URL}/${articleObject.voiceOverKey}`)}
            name="play"
          />
        )}
      </Row>
      <Row style={{ alignItems: 'center' }}>
        <ArticleTitle style={{ fontSize: 14 }}>{articleObject.title}</ArticleTitle>
      </Row>
      <HTML source={{ html: cleanHTML(articleObject.content) }} />
      {articleObject.content.indexOf('*') !== -1 && (
        <Disclaimer style={{ fontSize: 10, marginTop: 20 }}>disclaimer</Disclaimer>
      )}
    </ArticleContainer>
  )
}

export function ArticlesScreen({ navigation }) {
  const subCategory = navigation.getParam('subCategory')
  const subCategoryObject = useSelector((state) =>
    selectors.subCategoryByIDSelector(state, subCategory),
  )
  const allArticlesByIDObject = useSelector(selectors.articlesObjectByIDSelector)
  const articles = subCategoryObject.articles
  const articlesTextArray = articles.reduce((acc, item) => {
    const selectedArticle = allArticlesByIDObject[item]
    if (!selectedArticle) {
      return acc
    }
    return acc.concat([selectedArticle.subCategory, selectedArticle.title, selectedArticle.content])
  }, [])

  useTextToSpeechHook({ navigation, text: articlesTextArray })

  return (
    <BackgroundTheme>
      <PageContainer>
        <Header screenTitle="encyclopedia" />
        <FlatList
          data={articles}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <ArticleItem index={index} article={item} articles={articles} />
          }}
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center', width: '100%' }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
        />
      </PageContainer>
    </BackgroundTheme>
  )
}

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 10;
  flex-wrap: wrap;
`

const ArticleContainer = styled.View`
  margin-vertical: 5px;
  border-radius: 10px;
  elevation: 3;
  background-color: #fff;
  padding-top: 20;
  padding-bottom: 35;
  padding-horizontal: 40;
`

const ArticleTitle = styled(TextWithoutTranslation)`
  font-size: 20;
  font-family: Roboto-Black;
  color: #e3629b;
  padding-bottom: 5;
  margin-right: auto;
`

const Disclaimer = styled(Text)`
  text-align: left;
  color: #1c1c1c;
`
