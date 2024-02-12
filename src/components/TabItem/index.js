import './index.css'

const TabItem = props => {
  const {tabDetails, isActive} = props
  const {label} = tabDetails

  const tabButtonBackground = isActive ? 'active-btn' : 'tab-button'

  return (
    <li className="tab-item">
      <button type="button" className={tabButtonBackground}>
        {label}
      </button>
    </li>
  )
}

export default TabItem
