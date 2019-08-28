import swal from 'sweetalert'

export const useDialog = () => {
  const confirm = ({ title, message }) => {
    return swal({
      title: title,
      text: message,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
  }

  const success = (message) => {
    return swal(
      message,
      {
        icon: "success",
      }
    )
  }

  return { confirm, success }
}