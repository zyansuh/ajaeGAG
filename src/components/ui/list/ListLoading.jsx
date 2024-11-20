import styled from 'styled-components'

const ListLoading = ({ loading }) => {
  return <>{loading && <Loading>Loading more...</Loading>}</>
}

export default ListLoading

const Loading = styled.p`
  text-align: center;
  font-size: 18px;
  color: black;
  margin: 20px 0;
`
