<script>
  import { Form, FormGroup, Input, Label, Button, FormText } from "sveltestrap";
</script>

<div class="formFeedback">
  <FormText class="fd-text">
    <h5 class="fd-heading">
      <strong>Contact Us</strong>
    </h5>
  </FormText>
  <Form class="fd-form">
    <FormGroup class="fd-name">
      <Label for="examplename" class="fd-namelabel">Name:*</Label>
      <Input type="text" name="name" id="examplename" />
    </FormGroup>
    <FormGroup class="fd-email">
      <Label for="exampleEmail" class="fd-emaillabel">Email:*</Label>
      <Input
        type="email"
        name="email"
        id="exampleEmail"
        placeholder="abc@gmail.com"
        required
      />
    </FormGroup>
    <FormGroup class="fd-textarea">
      <Label for="Text Area" class="fd-textarealabel">Message:*</Label>
      <Input
        type="textarea"
        name="text"
        id="exampleText"
        placeholder="Write something about yourself"
      />
    </FormGroup>
    <div class="fd-submit">
      <Button type="button">Submit</Button>
    </div>
  </Form>
</div>

<style lang="scss">
  .formFeedback {
    margin-bottom: 20px;
  }
  :global(.fd-text) {
    padding-top: 15px;
  }
  :global(.fd-heading) {
    color: #000000;
    padding-bottom: 5px;
    padding-top: 10px;
    text-align: center;
  }
  :global(.fd-form) {
    background-color: #f0f8ff;
    padding-top: 20px;
    height: 92%;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
    border-radius: 8px;
    outline: none;
    border: 2px solid #c4c4c4;
  }
  :global(.fd-name) {
    width: 90%;
    padding-left: 10%;
    padding-top: 15px;
  }
  :global(.fd-namelabel) {
    margin-right: 10px;
    display: flex;
  }
  :global(.fd-email) {
    width: 90%;
    padding-left: 10%;
    padding-top: 10px;
  }
  :global(.fd-emaillabel) {
    margin-right: 10px;
    display: flex;
  }
  :global(.fd-textarea) {
    width: 90%;
    padding-left: 10%;
  }
  :global(.fd-textarealabel) {
    margin-right: 10px;
    display: flex;
  }
  .fd-submit {
    display: block;
    text-align: center;
  }
</style>
