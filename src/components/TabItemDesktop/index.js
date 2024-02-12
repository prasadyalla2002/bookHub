import './index.css'

const TabItemDesktop = props => {
  const {tabDetails, isActive} = props
  const {label} = tabDetails

  const tabStyling = isActive ? 'active-tab' : 'normal-tab'

  return (
    <li className="tab">
      <button type="button" className={tabStyling}>
        {label}
      </button>
    </li>
  )
}

export default TabItemDesktop
