import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    HeaderContainer,
    NavigationHeader,
    HeaderBackButton,
    HeaderTitle
} from './Header.styled';

interface Props {
    title: string;
    showBackButton?: boolean;
}

const Header = ({title, showBackButton = true}: Props) => {
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
