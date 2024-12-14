import { setLoading } from '../store/Slices/AppSlice'
import { useAppDispatch } from '../store/hooks'

const useSetDispatch = () => {
   const dispatch = useAppDispatch()
  const showLoader = () => dispatch(setLoading(true))
  const hideLoader =() => dispatch(setLoading(false))
  return {showLoader, hideLoader, dispatch}
}

export default useSetDispatch