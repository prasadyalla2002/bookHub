import './index.css'

const TabItem = props => {
  const {tabDetails, isActive, onChangeTab} = props
  const {id, label} = tabDetails

  const onClickTab = () => {
    onChangeTab(id)
  }

  const tabButtonBackground = isActive ? 'active-btn' : 'tab-button'

  return (
    <li className="tab-item">
      <button
        type="button"
        className={tabButtonBackground}
        onClick={onClickTab}
      >
        {label}
      </button>
    </li>
  )
}

export default TabItem
