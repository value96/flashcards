import { WordList } from "@widgets/WordList/ui"
import { useNavigate } from "react-router-dom"

export default () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/")
  }

  return (
    <>
      <WordList />
      <button onClick={handleClick}>close</button>
    </>
  )
}
