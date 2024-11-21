import styled from 'styled-components'

import ListCard from '../../components/ui/list/ListCard'
import ListLoading from '../../components/ui/list/ListLoading'

import useInfiniteScroll from '../../hooks/useInfiniteScroll'

const ListPage = () => {
  const { data, loading, lastElementRef } = useInfiniteScroll()

  if (loading && data.length === 0) return <p>Loading...</p>

  return (
    <ListContainer>
      {data.map((post) => (
        <ListCard key={post.id} post={post} />
      ))}
      <ListLoading loading={loading} />
      <div ref={lastElementRef}></div>
    </ListContainer>
  )
}

export default ListPage

const ListContainer = styled.div`
  padding: 20px;
`
