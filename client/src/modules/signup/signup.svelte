<script lang="ts">
  import { Form, FormGroup, Input, Label, Button, FormText } from 'sveltestrap';
  import { Col, Row } from 'sveltestrap';
  import { Link, Router } from 'svelte-routing';
  import { Utility } from '../../shared/utilities/utility';
  import { classList } from 'svelte-body';
  import { callRegisterApi } from '../../services/users.services';
  /**
   * Svelte Reactive Variables, used to display the validation message
   * on update the signup form elements.
   */
  let ageInvalid = false;
  let isusernameInvalid = false;
  let isTextareaInValid = false;
  let username = '';
  let email = '';
  let password = '';
  let confirmpassword = '';
  let count = 0;
  let isPasswordInValid = false;
  let isconfirmPasswordInValid = false;
  let isLogmeIn: boolean = false;
  /**
   * used to capture form fields value.
   */
  let formvalues = {
    selectAge: '',
    textArea: '',
    checkmeout: false,
    gender: '',
  };

  /**
   * Svelte reactive variable used to display error messages.
   */
  let errors = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    textArea: '',
    gender: '',
    checkmeout: '',
    selectAge: '',
  };

  /**
   * On change of email the value of reactive svelte variable will change.
   * Because field is bind with email variable.
   */
  $: isEmailInValid = Utility.isEmailInValid(email);

  /**
   * on entering username it validates the field.
   * @param e - input event
   */
  const inputUsername = (e: Event) => {
    username = (e.target as HTMLInputElement).value;
    if (username.length > 0 && username.trim().length === 0) {
      isusernameInvalid = true;
      errors.username = 'Name can not have all spaces';
    } else if (username.trim().length < 4 && username.trim().length > 0) {
      isusernameInvalid = true;
      errors.username =
        'Name must have 4 character long without leading and trailing spaces';
    } else {
      isusernameInvalid = false;
      errors.password = '';
    }
  };
  /**
   * on entering password it validates the field.
   * @param e - input event
   */
  const inputPassword = (e: Event) => {
    password = (e.target as HTMLInputElement).value;
    if (password.length > 0 && password.trim().length === 0) {
      isPasswordInValid = true;
      errors.password = 'Password can not have all spaces';
    } else if (Utility.isPasswordInValid(password.trim())) {
      isPasswordInValid = true;
      errors.password =
        'Password must have eight character long without leading and trailing spaces';
    } else {
      isPasswordInValid = false;
      errors.password = '';
    }
  };

  /**
   * on entering confirmpassword it validates the field.
   * @param e - input event
   */
  const inputconfirmPassword = (e: Event) => {
    confirmpassword = (e.target as HTMLInputElement).value;
    if (confirmpassword.length > 0 && confirmpassword.trim().length === 0) {
      isconfirmPasswordInValid = true;
      errors.confirmpassword = 'Conirm Password can not have all spaces';
    } else if (Utility.isconfirmPasswordInValid(confirmpassword.trim())) {
      isconfirmPasswordInValid = true;
      errors.confirmpassword =
        'Confirm Password must have eight character long without leading and trailing spaces';
    } else {
      isconfirmPasswordInValid = false;
      errors.confirmpassword = '';
    }
  };
  /**
   * If username,password,confirmPassword have error, then focus get back to the  fiels again.
   * @param e - blur event
   */
  const blurUsername = (e: Event) => {
    username = (e.target as HTMLInputElement).value;
    if (isusernameInvalid) {
      username = username.trim();
      (e.target as HTMLInputElement).focus();
    }
  };
  const blurPassword = (e: Event) => {
    password = (e.target as HTMLInputElement).value;
    if (isPasswordInValid) {
      password = password.trim();
      (e.target as HTMLInputElement).focus();
    }
  };
  const blurconfirmPassword = (e: Event) => {
    confirmpassword = (e.target as HTMLInputElement).value;
    if (isconfirmPasswordInValid) {
      confirmpassword = confirmpassword.trim();
      (e.target as HTMLInputElement).focus();
    }
  };
  /**
   * validate age field
   * @param e - change event
   */
  const ageselection = (e: Event) => {
    let ageselect = (e.target as HTMLInputElement).value;
    if (!ageselect.length) {
      ageInvalid = true;
      errors.selectAge = 'Please select age';
    } else {
      ageInvalid = false;
    }
  };

  /**
   * Display error message if it is unchecked.
   * @param e - change event
   */
  const ischeckmeoutvalid = (e: Event) => {
    let checkme = (e.target as HTMLInputElement).checked;
    if (checkme) {
      errors.checkmeout = '';
    } else {
      errors.checkmeout = 'Please click the checkbox';
    }
  };

  /**
   * Display error message is gender is not selected.
   * @param e - change event
   */
  const isclickmeout = (e: Event) => {
    let click = (e.target as HTMLInputElement).checked;
    if (click) {
      errors.gender = '';
    }
  };

  /**
   * Display error message if summary content length is less than 20 characters.
   * @param e - keyup event
   */
  const textareaLengthCheck = (e: Event) => {
    let summary = (e.target as HTMLInputElement).value;
    if (!summary.length) {
      isTextareaInValid = true;
      errors.textArea = 'Please enter valid inputs';
    } else if (summary.length < 20) {
      isTextareaInValid = true;
      errors.textArea = 'Please enter summary at least 20 characters long';
    } else if (summary.trim().length < 20) {
      isTextareaInValid = true;
      errors.textArea =
        'Please enter summary 20 characters long without leading & trailing spaces';
    } else if (summary.trim().length >= 20) {
      isTextareaInValid = false;
      errors.textArea = '';
    }
    count = formvalues.textArea.trim().length;
  };

  /**
   * Checks if criteria is matching after removing spaces.
   * @param e - lrur event
   */
  const blurSummary = (e: Event) => {
    let summary = (e.target as HTMLInputElement).value;
    count = summary.trim().length;
    if (!summary.length) {
      isTextareaInValid = false;
      errors.textArea = '';
    } else if (count < 20) {
      formvalues.textArea = summary.trim();
      (e.target as HTMLInputElement).focus();
    } else {
      formvalues.textArea = summary.trim();
    }
  };

  /**
   * Used to store data, required for API call.
   */
  const signupData = {};

  /**
   * call asynchronous API call.
   * after success, it returns to login page.
   */
  const submitForm = async () => {
    /**
     * Perform Fetch API call for registration
     */
    await callRegisterApi(signupData, isLogmeIn);
  };

  /**
   * Form submit method. Validate form fields value and submit if there is no error.
   * @param e - SUbmit Event
   */
  export const onSubmit = () => {
    if (username === '') {
      isusernameInvalid = true;
      errors.username = 'Name must be filled out';
    } else if (username.trim().length < 4) {
      errors.username = 'Name atleast contain 4 characters';
    } else {
      errors.username = '';
    }
    /**
     * Password Validation
     */
    if (password === '') {
      isPasswordInValid = true;
      errors.password = 'Password must be filled out';
    } else if (password.trim().length < 8) {
      isPasswordInValid = true;
      errors.password = 'Password  can have atleast 8 characters';
    } else {
      errors.password = '';
    }
    /**confirm Password validation*/
    if (confirmpassword === '') {
      isconfirmPasswordInValid = true;
      errors.confirmpassword = 'ConfirmPassword must be filled out';
    } else if (confirmpassword.trim().length < 8) {
      isconfirmPasswordInValid = true;
      errors.confirmpassword = 'ConfirmPassword can have atleast 8 characters';
    } else if (password != confirmpassword) {
      isconfirmPasswordInValid = true;
      errors.confirmpassword = 'ConfirmPassword should match to Password';
    } else {
      errors.confirmpassword = '';
    }

    /**
     * About me textarea validation
     */
    if (formvalues.textArea === '') {
      isTextareaInValid = true;
      errors.textArea = 'Textarea must be filled out';
    } else if (formvalues.textArea.trim().length < 20) {
      isTextareaInValid = true;
      errors.textArea = 'Text at least contain 20 characters';
    } else {
      errors.textArea = '';
    }

    /**
     * Email Validation
     */
    if (email === '') {
      isEmailInValid = true;
      errors.email = 'Email must be filled out';
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      isEmailInValid = true;
      errors.email = 'You have entered an invalid email address';
    } else {
      errors.email = '';
    }

    /**
     * Term & condtion validation
     */
    /* ischeckmeoutvalid(e); */
    if (formvalues.checkmeout == false) {
      errors.checkmeout = '*Please click the checkbox';
    } else {
      errors.checkmeout = '';
    }

    /**
     * Gender validation
     */
    /* isclickmeout(e); */
    if (formvalues.gender.length == 0) {
      errors.gender = '*Please select gender';
    } else {
      errors.gender = '';
    }

    /**
     * Age validation
     */
    if (formvalues.selectAge.length == 0) {
      ageInvalid = true;
      errors.selectAge = 'Please select age';
    } else {
      errors.selectAge = '';
    }

    /**
     * If there is no error, then call the register API.
     * It checks the length of all error messages, if it is 0 then submit the form.
     */
    let hasError = Object.values(errors).reduce(
      (acc, curr) => acc + curr.length,
      0
    );
    if (!hasError) {
      signupData['username'] = username;
      signupData['email'] = email;
      signupData['password'] = password;

      submitForm();
    }
  };
</script>

<svelte:body use:classList="{'page-signup'}" />
<div class="px-container content-signup">
  <Row>
    <Col lg="{{ size: 6, order: 2, offset: 3 }}">
      <FormText class="px-heading">
        <h2 class="px-signup">Sign Up</h2>
      </FormText>
      <Form class="px-form">
        <p class="px-toptext">
          All <span class="asterick">*</span>marked fields are mandatory to
          fill.
        </p>
        <FormGroup class="px-username">
          <Label for="username" class="px-usernamelabel">
            Name:<span class="asterick">*</span></Label
          >
          <Input
            type="text"
            bind:value="{username}"
            name="username"
            id="username"
            required
            placeholder="name of the user"
            on:input="{inputUsername}"
            on:blur="{blurUsername}"
            invalid="{isusernameInvalid}"
            feedback="{errors.username}"
          />
        </FormGroup>
        <!-- <span class="px-text-danger">{errors.username}</span> -->
        <FormGroup class="px-email">
          <Label for="email" class="px-emaillabel">
            Email:<span class="asterick">*</span></Label
          >
          <Input
            type="email"
            bind:value="{email}"
            name="email"
            id="email"
            required
            placeholder="abc@gmail.com"
            invalid="{isEmailInValid}"
            feedback="{errors.email}"
          />
        </FormGroup>
        <FormGroup class="px-password">
          <Label for="password" class="px-passwordlabel"
            >Password:<span class="asterick">*</span></Label
          >
          <Input
            type="password"
            bind:value="{password}"
            on:input="{inputPassword}"
            on:blur="{blurPassword}"
            name="password"
            id="password"
            required
            invalid="{isPasswordInValid}"
            placeholder="Enter a password"
            feedback="{errors.password}"
          />
          <p class="passwordhint">Password must have atleast 8 characters.</p>
        </FormGroup>
        <FormGroup class="px-confirmpassword">
          <Label for="confirmpassword" class="px-confirmpasswordlabel"
            >Confirm Password:<span class="asterick">*</span></Label
          >
          <Input
            type="password"
            bind:value="{confirmpassword}"
            on:input="{inputconfirmPassword}"
            on:blur="{blurconfirmPassword}"
            name="confirmpassword"
            id="conirmpassword"
            required
            invalid="{isconfirmPasswordInValid}"
            placeholder="Enter password again"
            feedback="{errors.confirmpassword}"
          />
        </FormGroup>
        <FormGroup class="px-age">
          <Label for="selectAge" class="px-agelabel"
            >Age:<span class="asterick">*</span></Label
          >
          <Input
            type="select"
            name="select"
            id="selectAge"
            bind:value="{formvalues.selectAge}"
            required
            placeholder="Select Age"
            invalid="{ageInvalid}"
            feedback="{errors.selectAge}"
            on:change="{ageselection}"
          >
            <option value="">Select an Age</option>
            <option>Below 18yrs</option>
            <option>19yrs to 35yrs</option>
            <option>Above 35yrs</option>
          </Input>
        </FormGroup>
        <FormGroup class="px-textarea">
          <div class="labelgroup">
            <Label for="textarea" class="px-textarealabel"
              >Summary:<span class="asterick">*</span>
            </Label>
            <span class="textcount">count:{count}</span>
          </div>
          <Input
            type="textarea"
            name="text"
            id="textarea"
            bind:value="{formvalues.textArea}"
            required
            placeholder="Write something about yourself"
            invalid="{isTextareaInValid}"
            feedback="{errors.textArea}"
            on:keyup="{textareaLengthCheck}"
            on:blur="{blurSummary}"
          />
        </FormGroup>
        <FormGroup class="px-gender">
          <span class="px-gendertitle"
            >Gender:<span class="asterick">*</span></span
          >
          <Label class="px-genderlabel1">
            <Input
              id="r1"
              type="radio"
              bind:group="{formvalues.gender}"
              required
              value="male"
              label="Male"
              on:change="{isclickmeout}"
            />
          </Label>
          <Label class="px-genderlabel2">
            <Input
              id="r2"
              type="radio"
              bind:group="{formvalues.gender}"
              required
              value="female"
              label="Female"
              on:change="{isclickmeout}"
            />
          </Label>
        </FormGroup>
        <span class="px-text-danger">{errors.gender}</span>

        <div class="">
          <FormGroup class="px-checkmeout">
            <Input
              id="checkout"
              type="checkbox"
              bind:checked="{formvalues.checkmeout}"
              required
              on:change="{ischeckmeoutvalid}"
            />
            <Label for="checkout" class="px-checkoutlabel"
              >Check me out<span class="asterick">*</span></Label
            >
          </FormGroup>
          <FormGroup class="px-signmeout">
            <Input id="signmeout" type="checkbox" bind:checked="{isLogmeIn}" />
            <Label for="checkout" class="px-signmeoutlabel">Log me In</Label>
          </FormGroup>
        </div>
        <div class="px-text-danger">{errors.checkmeout}</div>
        <Button class="px-btn-register" type="button" on:click="{onSubmit}"
          >Register</Button
        >
        <div class="px-account">
          <Router>
            <Link to="/login">Already have an account? Login</Link>
          </Router>
        </div>
      </Form>
    </Col>
  </Row>
</div>

<style lang="scss">
  @import './signup.scss';
</style>
