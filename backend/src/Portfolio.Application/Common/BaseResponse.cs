namespace Portfolio.Application.Common;

public class BaseResponse<T>
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public T? Data { get; set; }
    public List<string> Errors { get; set; } = [];

    public static BaseResponse<T> Ok(T data, string? message = null) =>
        new() { Success = true, Data = data, Message = message };

    public static BaseResponse<T> Fail(string message, List<string>? errors = null) =>
        new() { Success = false, Message = message, Errors = errors ?? [] };

    public static BaseResponse<T> Fail(List<string> errors) =>
        new() { Success = false, Errors = errors };
}

public class BaseResponse : BaseResponse<object>
{
    public static BaseResponse Ok(string? message = null) =>
        new() { Success = true, Message = message };

    public new static BaseResponse Fail(string message) =>
        new() { Success = false, Message = message };
}
