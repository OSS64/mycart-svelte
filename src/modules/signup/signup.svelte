<script lang="ts">
	import { Form, FormGroup, Input, Label, Button, FormText } from 'sveltestrap'
	import { Col, Row } from 'sveltestrap'
	import { navigate, Link } from 'svelte-routing'
	import { Utility } from '../../shared/utilities/utility'
	let checkme = false
	let click = false
	$: ageInvalid = false
	$: email = ''
	$: password = ''
	let formvalues = {
		selectAge: '',
		textArea: '',
		checkmeout: false,
		gender: '',
	}
	$: errors = {
		email: '',
		password: '',
		textArea: '',
		gender: '',
		checkmeout: '',
		selectAge: '',
	}
	$: isEmailInValid = Utility.isEmailValid(email)
	$: isPasswordInValid = Utility.isPasswordValid(password)
	$: isTextareaInValid =
		formvalues.textArea.length < 20 && formvalues.textArea.length > 0
	const ageselection = (e) => {
		let ageselect = e.target.value
		if (ageselect) {
			ageInvalid = false
		}
	}
	const ischeckmeoutvalid = (e) => {
		checkme = e.target.checked
		if (checkme == true) {
			errors.checkmeout = ''
		}
	}
	const isclickmeout = (e) => {
		click = e.target.checked
		if (click == true) {
			errors.gender = ';'
		}
	}
	function onSubmit(e) {
		if (password === '') {
			isPasswordInValid = true
			errors.password = 'password must be filled out'
		} else if (
			password.trim().length < 8 ||
			!password.match(/^[A-Za-z]\w{7,14}$/)
		) {
			isPasswordInValid = true
			errors.password = 'password  must atleast 8 characters'
		} else {
			errors.password = ''
		}
		if (formvalues.textArea === '') {
			isTextareaInValid = true
			errors.textArea = 'textarea must be filled out'
		} else if (formvalues.textArea.trim().length < 20) {
			isTextareaInValid = true
			errors.textArea = 'text at least contain 20 characters'
		} else {
			errors.textArea = ''
		}
		if (email === '') {
			isEmailInValid = true
			errors.email = 'email must be filled out'
		} else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
			isEmailInValid = true
			errors.email = 'you have entered an invalid email address'
		} else {
			errors.email = ''
		}
		ischeckmeoutvalid(e)
		if (formvalues.checkmeout == false) {
			errors.checkmeout = '*Please click the checkbox'
		} else {
			errors.checkmeout = ''
		}
		isclickmeout(e)
		if (formvalues.gender.length == 0) {
			errors.gender = '*Please select gender'
		} else {
			errors.gender = ''
		}
		if (formvalues.selectAge.length == 0) {
			ageInvalid = true
			errors.selectAge = 'please select age'
		} else {
			errors.selectAge = ''
		}
		if (
			errors.email == '' &&
			errors.password == '' &&
			errors.textArea == '' &&
			errors.selectAge == '' &&
			errors.gender == '' &&
			errors.checkmeout == ''
		) {
			localStorage.setItem('email', email)
			localStorage.setItem('password', password)
			localStorage.setItem('selectAge', formvalues.selectAge)
			localStorage.setItem('Text', formvalues.textArea)
			localStorage.setItem('checkmeout', String(formvalues.checkmeout))
			localStorage.setItem('gender', formvalues.gender)
			navigate('/login')
		}
	}
</script>

<div class="px-container">
	<Row>
		<Col lg={{ size: 6, order: 2, offset: 3 }}>
			<FormText class="px-heading">
				<h2 class="px-signup">Sign Up</h2>
			</FormText>
			<Form class="px-form">
				<FormGroup class="px-email">
					<Label for="email" class="px-emaillabel">Email:</Label>
					<Input
						type="email"
						bind:value={email}
						name="email"
						id="exampleEmail"
						placeholder="abc@gmail.com"
						invalid={isEmailInValid}
						feedback={errors.email}
					/>
				</FormGroup>
				<FormGroup class="px-password">
					<Label for="password" class="px-passwordlabel">Password:</Label>
					<Input
						type="password"
						bind:value={password}
						name="password"
						id="examplePassword"
						invalid={isPasswordInValid}
						placeholder="Enter a password"
						feedback={errors.password}
					/>
				</FormGroup>
				<FormGroup class="px-age">
					<Label for="age" class="px-agelabel">Age:</Label>
					<Input
						type="select"
						name="select"
						id="selectAge"
						bind:value={formvalues.selectAge}
						required
						placeholder="Select Age"
						invalid={ageInvalid}
						feedback={errors.selectAge}
						on:change={ageselection}
					>
						<option>Below 18yrs</option>
						<option>19yrs to 35yrs</option>
						<option>Above 35yrs</option>
					</Input>
				</FormGroup>
				<FormGroup class="px-textarea">
					<Label for="texarea" class="px-textarealabel">Summary:</Label>
					<Input
						type="textarea"
						name="text"
						id="exampleText"
						bind:value={formvalues.textArea}
						required
						placeholder="Write something about yourself"
						invalid={isTextareaInValid}
						feedback={errors.textArea}
					/>
				</FormGroup>
				<FormGroup class="px-gender">
					<span class="px-gendertitle">Gender:</span>
					<Label class="px-genderlabel1">
						<Input
							id="r1"
							type="radio"
							bind:group={formvalues.gender}
							required
							value="male"
							label="Male"
							on:change={isclickmeout}
						/>
					</Label>
					<Label class="px-genderlabel2">
						<Input
							id="r2"
							type="radio"
							bind:group={formvalues.gender}
							required
							value="female"
							label="Female"
							on:change={isclickmeout}
						/>
					</Label>
				</FormGroup>
				<div class="px-text-danger">{errors.gender}</div>
				<FormGroup class="px-checkmeout">
					<Input
						id="c1"
						type="checkbox"
						label="Check me out"
						bind:checked={formvalues.checkmeout}
						on:change={ischeckmeoutvalid}
					/>
				</FormGroup>
				<div class="px-text-danger">{errors.checkmeout}</div>
				<Button type="button" on:click={onSubmit}>Register</Button>
			</Form>
		</Col>
	</Row>
	<div class="px-account">
		<Link to="/login">Account Login</Link>
	</div>
</div>

<style lang="scss">
	@import './signup.scss';
</style>
