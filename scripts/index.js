$(document).ready(function () {
  function initializeSelects() {
    $(".form-select").select2({
      width: "100%",
      dropdownParent: $(".modal-content"),
    });
  }

  function applyMasks() {
    $("#cpf").mask("000.000.000-00");
    $("#telephone").mask("(00) 9 0000-0000");
  }

  $("#cadastroModal").on("show.bs.modal", function () {
    initializeSelects();
    applyMasks();
  });

  function loadUsers() {
    $.ajax({
      url: "http://localhost/crud-php/read.php",
      type: "GET",
      dataType: 'json',
      success: function (response) {
        const users = JSON.parse(response);
        console.log(users);

        $("#results").empty();

        response.forEach(function(user) { 
            $("#results").append(`
                <tr>
                    <td>${user.nome}</td>
                    <td>${user.cpf}</td>
                    <td>${user.cidade}</td>
                    <td>${user.email}</td>
                    <td>${user.telefone}</td>
                    <td>
                        <button type="button" class="btn btn-success" onclick="getId(${user.id})">Editar</button>
                        <button type="button" class="btn btn-danger" onclick="remove(${user.id})">Excluir</button>
                    </td>
                </tr>
            `);
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(`Erro: ${textStatus} - ${errorThrown}`);
        Swal.fire(
          "Erro!",
          "Ocorreu um erro ao carregar os dados. Tente novamente.",
          "error"
        );
      },
    });
  }

  loadUsers();

  function createUser() {
    const userData = {
      name: $("#name").val(),
      cpf: $("#cpf").val(),
      telephone: $("#telephone").val(),
      email: $("#email").val(),
      cidade: $("#cidade").val(),
      estado: $("#estado").val(),
      especialidade: $("#especialidade").val(),
      stack: $("#stack").val(),
      observacao: $("#observacao").val(),
    };

    $.ajax({
      url: "http://localhost/crud-php/cadastro.php",
      type: "POST",
      data: userData,
      success: function (response) {
        Swal.fire("Sucesso!", response.message, "success");
        $("#cadastroModal").modal("hide");
        loadUsers();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        Swal.fire(
          "Erro!",
          "Ocorreu um erro ao cadastrar. Tente novamente.",
          "error"
        );
      },
    });
  }

  function remove(id) {
    $.ajax({
      url: `http://localhost/crud-php/remove.php?id=${id}`,
      type: "DELETE",
      success: function (response) {
        Swal.fire("Sucesso!", response.message, "success");
        loadUsers(); 
      },
      error: function (jqXHR, textStatus, errorThrown) {
        Swal.fire(
          "Erro!",
          "Ocorreu um erro ao excluir. Tente novamente.",
          "error"
        );
      },
    });
  }

  $("#btn").on("click", function () {
    createUser();
  });
});
