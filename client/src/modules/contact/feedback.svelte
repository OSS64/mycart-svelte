<script lang="ts">
  import { Form, FormGroup, Input, Label, Button, FormText } from "sveltestrap";
  import { classList } from "svelte-body";
</script>

<svelte:body use:classList={"page-feedback"} />
<div class="formFeedback">
  <FormText class="fd-text">
    <h5 class="fd-heading">
      <strong>Contact Us</strong>
    </h5>
  </FormText>
  <Form class="fd-form">
    <FormGroup class="fd-name">
      <Label for="examplename" class="fd-namelabel">Name:</Label>
      <Input
        type="text"
        name="name"
        id="examplename"
        placeholder="Write your name"
      />
    </FormGroup>
    <FormGroup class="fd-email">
      <Label for="exampleEmail" class="fd-emaillabel">Email:</Label>
      <Input
        type="email"
        name="email"
        id="exampleEmail"
        placeholder="abc@gmail.com"
      />
    </FormGroup>
    <FormGroup class="fd-textarea">
      <Label for="Text Area" class="fd-textarealabel">Message:</Label>
      <Input
        type="textarea"
        name="text"
        id="exampleText"
        placeholder="Give your feedback"
      />
    </FormGroup>
    <div class="fd-submit">
      <Button type="button">Submit</Button>
    </div>
  </Form>
</div>

<style lang="scss">
  @import "./feedback.scss";
</style>
