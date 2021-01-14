@extends('layouts.app')

@section('content')
<div class="card">
    <div class="card-body login-card-body">
         <p class="login-box-msg">Regístrese para iniciar su sesión</p>
                          <form method="POST" action="{{ route('login') }}">
                                <div class="input-group mb-3">
                                <input type="email" class="form-control @error('email') is-invalid @enderror" name="email" id="email" value="{{ old('email') }}" required autocomplete="email" placeholder="Correo electrónico" autofocus>
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                                  @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>

                                <div class="input-group mb-3">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required placeholder="Contraseña" autocomplete="current-password">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                                <div class="row">
                                <div class="col-8">
                                    <div class="icheck-primary">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                    <label for="remember">Recuérdame</label>
                                    </div>
                                </div>
                                <!-- /.col -->
                                <div class="col-4">
                                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                                </div>
                                <!-- /.col -->
                                </div>
                        </form>
    </div>
</div>
   
@endsection