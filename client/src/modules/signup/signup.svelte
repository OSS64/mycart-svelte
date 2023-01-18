<script lang="ts">
  import {
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    FormText,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
  } from "sveltestrap";
  import { Col, Row } from "sveltestrap";
  import { navigate, Link, Router } from "svelte-routing";
  import { Utility } from "../../shared/utilities/utility";
  import { AppConstants } from "../../app-constants/app-config";
  import { onDestroy } from "svelte";

  /**
   * Svelte Reactive Variables, used to display the validation message
   * on update the signup form elements.
   */
  let ageInvalid = false;
  let isTextareaInValid = false;
  let email = "";
  let password = "";
  let count = 0;
  let isPasswordInValid = false;

  /**
   * used to capture form fields value.
   */
  let formvalues = {
    selectAge: "",
    textArea: "",
    checkmeout: false,
    gender: "",
  };

  /**
   * Svelte reactive variable used to display error messages.
   */
  let errors = {
    email: "",
    password: "",
    textArea: "",
    gender: "",
    checkmeout: "",
    selectAge: "",
  };

  /**
   * On change of email the value of reactive svelte variable will change.
   * Because field is bind with email variable.
   */
  $: isEmailInValid = Utility.isEmailInValid(email);

  /**
   * on entering password it validates the field.
   * @param e - input event
   */
  const inputPassword = (e: Event) => {
    password = (e.target as HTMLInputElement).value;
    if (password.length > 0 && password.trim().length === 0) {
      isPasswordInValid = true;
      errors.password = "Password can not have all spaces.";
    } else if (Utility.isPasswordInValid(password.trim())) {
      isPasswordInValid = true;
      errors.password =
        "Password must have eight character long without leading and trailing spaces.";
    } else {
      isPasswordInValid = false;
      errors.password = "";
    }
  };

  /**
   * If password has error, then focus get back to the password field again.
   * @param e - blur event
   */
  const blurPassword = (e: Event) => {
    password = (e.target as HTMLInputElement).value;
    if (isPasswordInValid) {
      password = password.trim();
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
      errors.selectAge = "please select age";
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
      errors.checkmeout = "";
    } else {
      errors.checkmeout = "Please click the checkbox";
    }
  };

  /**
   * Display error message is gender is not selected.
   * @param e - change event
   */
  const isclickmeout = (e: Event) => {
    let click = (e.target as HTMLInputElement).checked;
    if (click) {
      errors.gender = "";
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
      errors.textArea = "Please enter valid inputs.";
    } else if (summary.length < 20) {
      isTextareaInValid = true;
      errors.textArea = "Please enter summary at least 20 characters long.";
    } else if (summary.trim().length < 20) {
      isTextareaInValid = true;
      errors.textArea =
        "Please enter summary 20 characters long without leading & trailing spaces.";
    } else if (summary.trim().length >= 20) {
      isTextareaInValid = false;
      errors.textArea = "";
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
      errors.textArea = "";
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
   * Used to check API response Status Code for error handling.
   */
  let resStatus = 0;

  /**
   * Flag to display Toast Message.
   */
  let isOpen: boolean = false;
  let toastMessage: string = "";
  let toggle = () => {
    isOpen = !isOpen;
  };

  /**
   * used for timer counter, to display message.
   */
  let counter: number;
  let interval: string | number | NodeJS.Timer;

  /**
   * Concat timer in toastmessage until timer reaches to 0.
   * At 0 sec, timer get stopped.
   */
  const startTimer = (msg: string) => {
    if (!counter) {
      stopTimer();
    } else {
      toastMessage = `${msg}.
        You will be redirected to login page after ${counter} sec${
        counter === 1 ? "" : "s"
      }.`;
      counter -= 1;
    }
  };

  /**
   * Trigger timer at an interval of 1 sec.
   */
  const showTimerMessage = (msg: string) => {
    if (!interval) {
      counter = 5;
      interval = setInterval(startTimer, 1000, msg);
    }
  };

  /**
   * Clear interval, to stop memory leak.
   * Then navigate to login page.
   */
  const stopTimer = () => {
    clearInterval(interval);
    interval = null;
    navigate("/login");
  };

  /**
   * One of Life Cycle Hooks implementation.
   */
  onDestroy(stopTimer);

  /**
   * call asynchronous API call.
   * after success, it returns to login page.
   */
  const submitForm = async () => {
    /**
     * Populate Fetch Header Requests.
     */
    const requestHeader: RequestInit = {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    /**
     * Perform Fetch API call for registration
     */
    try {
      await fetch(AppConstants.apiBase + "/register", requestHeader)
        .then((response) => {
          isOpen = true;
          resStatus = response.status;
          return response.json();
        })
        .then((data) => {
          switch (resStatus) {
            case 200:
            case 400:
            case 404:
            default:
              toastMessage = data.message;
              break;

            case 201:
              toastMessage = data.message;
              showTimerMessage(data.message);
              break;
          }
        })
        .catch((error) => {
          isOpen = true;
          toastMessage = `Unable to connect API.
          Internet Connection Issue.
          ${error}`;
        });
    } catch (error) {
      console.log("catch error:", error);
    }
  };

  /**
   * Form submit method. Validate form fields value and submit if there is no error.
   * @param e - SUbmit Event
   */
  export const onSubmit = (e: Event) => {
    /**
     * Password Validation
     */
    if (password === "") {
      isPasswordInValid = true;
      errors.password = "password must be filled out.";
    } else if (password.trim().length < 8) {
      isPasswordInValid = true;
      errors.password = "password  can not have all space.";
    } else {
      errors.password = "";
    }

    /**
     * About me textarea validation
     */
    if (formvalues.textArea === "") {
      isTextareaInValid = true;
      errors.textArea = "textarea must be filled out";
    } else if (formvalues.textArea.trim().length < 20) {
      isTextareaInValid = true;
      errors.textArea = "text at least contain 20 characters";
    } else {
      errors.textArea = "";
    }

    /**
     * Email Validation
     */
    if (email === "") {
      isEmailInValid = true;
      errors.email = "email must be filled out";
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      isEmailInValid = true;
      errors.email = "you have entered an invalid email address";
    } else {
      errors.email = "";
    }

    /**
     * Term & condtion validation
     */
    /* ischeckmeoutvalid(e); */
    if (formvalues.checkmeout == false) {
      errors.checkmeout = "*Please click the checkbox";
    } else {
      errors.checkmeout = "";
    }

    /**
     * Gender validation
     */
    /* isclickmeout(e); */
    if (formvalues.gender.length == 0) {
      errors.gender = "*Please select gender";
    } else {
      errors.gender = "";
    }

    /**
     * Age validation
     */
    if (formvalues.selectAge.length == 0) {
      ageInvalid = true;
      errors.selectAge = "please select age";
    } else {
      errors.selectAge = "";
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
      signupData["email"] = email;
      signupData["password"] = password;
      signupData["username"] = email;
      submitForm();
    }
  };
</script>

<div class="px-container">
  <Modal {isOpen} {toggle}>
    <ModalHeader {toggle}>Register Response | Status:{resStatus}</ModalHeader>
    <ModalBody>
      {toastMessage}
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
  <Row>
    <Col lg={{ size: 6, order: 2, offset: 3 }}>
      <FormText class="px-heading">
        <h2 class="px-signup">Sign Up</h2>
      </FormText>
      <Form class="px-form">
        <p class="px-toptext">
          All <span class="asterick">*</span>marked fields are mandatory to
          fill.
        </p>
        <FormGroup class="px-email">
          <Label for="email" class="px-emaillabel">
            Email:<span class="asterick">*</span></Label
          >
          <Input
            type="email"
            bind:value={email}
            name="email"
            id="email"
            required
            placeholder="abc@gmail.com"
            invalid={isEmailInValid}
            feedback={errors.email}
          />
        </FormGroup>
        <FormGroup class="px-password">
          <Label for="password" class="px-passwordlabel"
            >Password:<span class="asterick">*</span></Label
          >
          <Input
            type="password"
            bind:value={password}
            on:input={inputPassword}
            on:blur={blurPassword}
            name="password"
            id="password"
            required
            invalid={isPasswordInValid}
            placeholder="Enter a password"
            feedback={errors.password}
          />
          <p class="passwordhint">Password must have atleast 8 characters.</p>
        </FormGroup>
        <FormGroup class="px-age">
          <Label for="selectAge" class="px-agelabel"
            >Age:<span class="asterick">*</span></Label
          >
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
            bind:value={formvalues.textArea}
            required
            placeholder="Write something about yourself"
            invalid={isTextareaInValid}
            feedback={errors.textArea}
            on:keyup={textareaLengthCheck}
            on:blur={blurSummary}
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
        <span class="px-text-danger">{errors.gender}</span>

        <FormGroup class="px-checkmeout">
          <Input
            id="checkout"
            type="checkbox"
            bind:checked={formvalues.checkmeout}
            required
            on:change={ischeckmeoutvalid}
          />
          <Label for="checkout" class="px-checkoutlabel"
            >Check me out<span class="asterick">*</span></Label
          >
        </FormGroup>
        <div class="px-text-danger">{errors.checkmeout}</div>
        <Button class="px-btn-register" type="button" on:click={onSubmit}
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
  @import "./signup.scss";
</style>