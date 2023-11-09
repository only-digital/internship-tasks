import styled from './only-main-header.module.scss';
import OnlyBtnTask from '../only-btn-task/only-btn-task';
import MainIcon from '../main-icon/main-icon';

const OnlyMainHeader = (props) => {
    return (
        <div className={styled.OnlyMainHeader}>
            <div className={styled.OnlyMainHeader__faviconcontainer}>
                <MainIcon/>
                <div className={styled.OnlyMainHeader__addtext}>CREATIVE DIGITAL PRODUCTION</div>
            </div>
            <OnlyBtnTask data={props.data}/>
        </div>
    )
}

export default OnlyMainHeader;