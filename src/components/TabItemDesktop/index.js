import './index.css'

const TabItemDesktop = props => {
  const {tabDetails, isActive, onChangeTab} = props
  const {id, label} = tabDetails

  const onClickTab = () => {
    onChangeTab(id)
  }

  const tabStyling = isActive ? 'active-tab' : 'normal-tab'

  return (
    <li className="tab">
      <button type="button" className={tabStyling} onClick={onClickTab}>
        {label}
      </button>
    </li>
  )
}

export default TabItemDesktop
