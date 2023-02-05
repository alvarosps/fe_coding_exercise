import * as React from 'react';
import {FaArrowLeft} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import { 
    HeaderContainer,
    HeaderBackButton,
    HeaderTitleContainer,
} from './Header.styled';

interface HeaderProps {
    title: string;
    showBackButton?: boolean;
}

const Header = (props: HeaderProps): JSX.Element => {
    const {title, showBackButton = true} = props;
    const navigate = useNavigate();

    const goToPreviousPage = (): void => {
        navigate(-1);
    };

    return (
        <HeaderContainer>
            {showBackButton && <HeaderBackButton onClick={goToPreviousPage}>
                <FaArrowLeft size={20} color='#87cefa' />
            </HeaderBackButton>}
            <HeaderTitleContainer>
                {title}
            </HeaderTitleContainer>
        </HeaderContainer>
    );
};

export default Header;
