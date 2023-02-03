import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    HeaderContainer,
    NavigationHeader,
    HeaderBackButton,
    HeaderTitle
} from './Header.styled';

interface HeaderProps {
    title: string;
    showBackButton?: boolean;
}

const Header = (props: HeaderProps): JSX.Element => {
    const { title, showBackButton = true } = props;

    const navigate = useNavigate();
    
    return (
        <HeaderContainer>
            <NavigationHeader>
                {showBackButton && (
                    <HeaderBackButton
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        🔙
                    </HeaderBackButton>
                )}
                <HeaderTitle>{title}</HeaderTitle>
            </NavigationHeader>
        </HeaderContainer>
    );
};

export default Header;
