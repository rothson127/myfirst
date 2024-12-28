import Container from '@mui/material/Container';

const Footer = () => {
	const link = "https://www.redstar.com";
	const target = "_blank";

	return (
        <Container maxWidth="false">
		<div className="flex justify-center">
			Copyright © <small>{new Date().getFullYear()}</small> @
			<a href={link} target={target}>
				www.redstar.com
			</a>
		</div>
        </Container>
	);
};

export default Footer;