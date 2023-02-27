<div class="cta">
  <h2 class="title">Learn more about our website.</h2>
  <h5 class="sub-title">
    Check out our services we offer from the list below.
  </h5>
</div>

<style lang="scss">
  .cta {
    background-image: url("./../content/images/parallax.avif");
    min-height: 300px;
    background-position: bottom left;
    position: relative;
    background-size: auto;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    flex-direction: column;
    position: relative;
    z-index: 1;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: #000;
      z-index: -1;
      opacity: 0.2;
    }
    .title {
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 15px;
    }
  }
</style>
